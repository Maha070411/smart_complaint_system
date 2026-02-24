package com.demo.smart_complaint_system.controller;

import com.demo.smart_complaint_system.dto.ComplaintRequest;
import com.demo.smart_complaint_system.dto.ComplaintResponse;
import com.demo.smart_complaint_system.service.ComplaintService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final ComplaintService complaintService;

    public UserController(ComplaintService complaintService) {
        this.complaintService = complaintService;
    }

    @PostMapping("/complaints")
    public ResponseEntity<ComplaintResponse> createComplaint(
            @Valid @RequestBody ComplaintRequest request,
            Authentication authentication) {
        return ResponseEntity.ok(complaintService.createComplaint(request, authentication.getName()));
    }

    @GetMapping("/complaints")
    public ResponseEntity<Page<ComplaintResponse>> getMyComplaints(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            Authentication authentication) {
        return ResponseEntity.ok(complaintService.getUserComplaints(authentication.getName(), page, size));
    }

    @GetMapping("/complaints/{id}")
    public ResponseEntity<ComplaintResponse> getComplaintDetails(
            @PathVariable Long id,
            Authentication authentication) {
        return ResponseEntity.ok(complaintService.getComplaintById(id, authentication.getName()));
    }
}
