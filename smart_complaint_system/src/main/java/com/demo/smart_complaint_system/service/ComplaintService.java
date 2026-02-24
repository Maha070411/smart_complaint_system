package com.demo.smart_complaint_system.service;

import com.demo.smart_complaint_system.dto.ComplaintRequest;
import com.demo.smart_complaint_system.dto.ComplaintResponse;
import com.demo.smart_complaint_system.dto.StatusUpdateRequest;
import com.demo.smart_complaint_system.entity.Complaint;
import com.demo.smart_complaint_system.entity.Status;
import com.demo.smart_complaint_system.entity.User;
import com.demo.smart_complaint_system.exception.ResourceNotFoundException;
import com.demo.smart_complaint_system.repository.ComplaintRepository;
import com.demo.smart_complaint_system.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class ComplaintService {

    private final ComplaintRepository complaintRepository;
    private final UserRepository userRepository;

    public ComplaintService(ComplaintRepository complaintRepository, UserRepository userRepository) {
        this.complaintRepository = complaintRepository;
        this.userRepository = userRepository;
    }

    public ComplaintResponse createComplaint(ComplaintRequest request, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Complaint complaint = Complaint.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .category(request.getCategory())
                .status(Status.PENDING)
                .user(user)
                .build();

        Complaint savedComplaint = complaintRepository.save(complaint);
        return mapToResponse(savedComplaint);
    }

    public Page<ComplaintResponse> getUserComplaints(String email, int page, int size) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        return complaintRepository.findByUser(user, pageable).map(this::mapToResponse);
    }

    public ComplaintResponse getComplaintById(Long id, String email) {
        Complaint complaint = complaintRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Complaint not found"));

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (!complaint.getUser().getId().equals(user.getId()) && !user.getRole().name().equals("ADMIN")) {
            throw new RuntimeException("Unauthorized access to complaint");
        }

        return mapToResponse(complaint);
    }

    public Page<ComplaintResponse> getAllComplaints(Status status, String category, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<Complaint> complaints;

        if (status != null && category != null) {
            complaints = complaintRepository.findByStatusAndCategory(status, category, pageable);
        } else if (status != null) {
            complaints = complaintRepository.findByStatus(status, pageable);
        } else if (category != null) {
            complaints = complaintRepository.findByCategory(category, pageable);
        } else {
            complaints = complaintRepository.findAll(pageable);
        }

        return complaints.map(this::mapToResponse);
    }

    public ComplaintResponse updateStatus(Long id, StatusUpdateRequest request) {
        Complaint complaint = complaintRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Complaint not found"));

        if (request.getStatus() == Status.RESOLVED
                && (request.getResolutionNote() == null || request.getResolutionNote().isBlank())) {
            throw new RuntimeException("Resolution note is mandatory when status is set to RESOLVED");
        }

        complaint.setStatus(request.getStatus());
        if (request.getResolutionNote() != null) {
            complaint.setResolutionNote(request.getResolutionNote());
        }

        Complaint updatedComplaint = complaintRepository.save(complaint);
        return mapToResponse(updatedComplaint);
    }

    private ComplaintResponse mapToResponse(Complaint complaint) {
        return ComplaintResponse.builder()
                .id(complaint.getId())
                .title(complaint.getTitle())
                .description(complaint.getDescription())
                .category(complaint.getCategory())
                .status(complaint.getStatus())
                .resolutionNote(complaint.getResolutionNote())
                .userId(complaint.getUser().getId())
                .userName(complaint.getUser().getName())
                .createdAt(complaint.getCreatedAt())
                .updatedAt(complaint.getUpdatedAt())
                .build();
    }
}
