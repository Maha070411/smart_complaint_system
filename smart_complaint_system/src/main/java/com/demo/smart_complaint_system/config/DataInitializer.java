package com.demo.smart_complaint_system.config;

import com.demo.smart_complaint_system.entity.Complaint;
import com.demo.smart_complaint_system.entity.Role;
import com.demo.smart_complaint_system.entity.Status;
import com.demo.smart_complaint_system.entity.User;
import com.demo.smart_complaint_system.repository.ComplaintRepository;
import com.demo.smart_complaint_system.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Arrays;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initData(UserRepository userRepository,
            ComplaintRepository complaintRepository,
            PasswordEncoder passwordEncoder) {
        return args -> {
            if (userRepository.count() == 0) {
                // Initialize Users
                User admin = User.builder()
                        .name("Admin User")
                        .email("admin@test.com")
                        .password(passwordEncoder.encode("admin123"))
                        .role(Role.ADMIN)
                        .build();

                User user1 = User.builder()
                        .name("John Doe")
                        .email("john@test.com")
                        .password(passwordEncoder.encode("user123"))
                        .role(Role.USER)
                        .build();

                User user2 = User.builder()
                        .name("Jane Smith")
                        .email("jane@test.com")
                        .password(passwordEncoder.encode("user123"))
                        .role(Role.USER)
                        .build();

                userRepository.saveAll(Arrays.asList(admin, user1, user2));

                // Initialize Complaints
                Complaint c1 = Complaint.builder()
                        .title("Network Issue")
                        .description("High latency during peak hours in Block A.")
                        .category("IT")
                        .status(Status.PENDING)
                        .user(user1)
                        .build();

                Complaint c2 = Complaint.builder()
                        .title("Furniture Repair")
                        .description("The armrest of my desk chair is broken.")
                        .category("Maintenance")
                        .status(Status.IN_PROGRESS)
                        .user(user1)
                        .build();

                Complaint c3 = Complaint.builder()
                        .title("AC Maintenance")
                        .description("AC not cooling properly in room 302.")
                        .category("Maintenance")
                        .status(Status.RESOLVED)
                        .resolutionNote("Filters cleaned and gas refilled.")
                        .user(user2)
                        .build();

                complaintRepository.saveAll(Arrays.asList(c1, c2, c3));

                System.out.println("Sample data initialized successfully!");
            }
        };
    }
}
