package com.demo.smart_complaint_system.repository;

import com.demo.smart_complaint_system.entity.Complaint;
import com.demo.smart_complaint_system.entity.Status;
import com.demo.smart_complaint_system.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ComplaintRepository extends JpaRepository<Complaint, Long> {
    Page<Complaint> findByUser(User user, Pageable pageable);

    Page<Complaint> findByStatus(Status status, Pageable pageable);

    Page<Complaint> findByCategory(String category, Pageable pageable);

    Page<Complaint> findByStatusAndCategory(Status status, String category, Pageable pageable);
}