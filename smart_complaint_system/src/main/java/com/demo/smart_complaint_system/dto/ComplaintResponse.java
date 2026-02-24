package com.demo.smart_complaint_system.dto;

import com.demo.smart_complaint_system.entity.Status;
import java.time.LocalDateTime;

public class ComplaintResponse {
    private Long id;
    private String title;
    private String description;
    private String category;
    private Status status;
    private String resolutionNote;
    private Long userId;
    private String userName;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public ComplaintResponse() {
    }

    public ComplaintResponse(Long id, String title, String description, String category, Status status,
            String resolutionNote, Long userId, String userName, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.category = category;
        this.status = status;
        this.resolutionNote = resolutionNote;
        this.userId = userId;
        this.userName = userName;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public static ComplaintResponseBuilder builder() {
        return new ComplaintResponseBuilder();
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

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
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

    public static class ComplaintResponseBuilder {
        private Long id;
        private String title;
        private String description;
        private String category;
        private Status status;
        private String resolutionNote;
        private Long userId;
        private String userName;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public ComplaintResponseBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public ComplaintResponseBuilder title(String title) {
            this.title = title;
            return this;
        }

        public ComplaintResponseBuilder description(String description) {
            this.description = description;
            return this;
        }

        public ComplaintResponseBuilder category(String category) {
            this.category = category;
            return this;
        }

        public ComplaintResponseBuilder status(Status status) {
            this.status = status;
            return this;
        }

        public ComplaintResponseBuilder resolutionNote(String resolutionNote) {
            this.resolutionNote = resolutionNote;
            return this;
        }

        public ComplaintResponseBuilder userId(Long userId) {
            this.userId = userId;
            return this;
        }

        public ComplaintResponseBuilder userName(String userName) {
            this.userName = userName;
            return this;
        }

        public ComplaintResponseBuilder createdAt(LocalDateTime createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public ComplaintResponseBuilder updatedAt(LocalDateTime updatedAt) {
            this.updatedAt = updatedAt;
            return this;
        }

        public ComplaintResponse build() {
            return new ComplaintResponse(id, title, description, category, status, resolutionNote, userId, userName,
                    createdAt, updatedAt);
        }
    }
}