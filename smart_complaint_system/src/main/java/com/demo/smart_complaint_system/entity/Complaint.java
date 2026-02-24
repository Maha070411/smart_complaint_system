package com.demo.smart_complaint_system.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDateTime;

@Entity
@Table(name = "complaints")
public class Complaint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private String category;

    @Enumerated(EnumType.STRING)
    private Status status = Status.PENDING;

    @Column(columnDefinition = "TEXT")
    private String resolutionNote;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    // Default Constructor
    public Complaint() {
    }

    // All-args Constructor
    public Complaint(Long id, String title, String description, String category, Status status, String resolutionNote,
            User user, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.category = category;
        this.status = status;
        this.resolutionNote = resolutionNote;
        this.user = user;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // Static Builder Method (to replace Lombok @Builder)
    public static ComplaintBuilder builder() {
        return new ComplaintBuilder();
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public String getResolutionNote() {
        return resolutionNote;
    }

    public void setResolutionNote(String resolutionNote) {
        this.resolutionNote = resolutionNote;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    // Simple Builder class for compatibility with existing service calls
    public static class ComplaintBuilder {
        private Long id;
        private String title;
        private String description;
        private String category;
        private Status status = Status.PENDING;
        private String resolutionNote;
        private User user;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public ComplaintBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public ComplaintBuilder title(String title) {
            this.title = title;
            return this;
        }

        public ComplaintBuilder description(String description) {
            this.description = description;
            return this;
        }

        public ComplaintBuilder category(String category) {
            this.category = category;
            return this;
        }

        public ComplaintBuilder status(Status status) {
            this.status = status;
            return this;
        }

        public ComplaintBuilder resolutionNote(String resolutionNote) {
            this.resolutionNote = resolutionNote;
            return this;
        }

        public ComplaintBuilder user(User user) {
            this.user = user;
            return this;
        }

        public ComplaintBuilder createdAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public ComplaintBuilder updatedAt(LocalDateTime updatedAt) {
            this.updatedAt = updatedAt;
            return this;
        }

        public Complaint build() {
            return new Complaint(id, title, description, category, status, resolutionNote, user, createdAt, updatedAt);
        }
    }
}