package com.example.hrmservices.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "leave-requests")
@Data
public class LeaveRequest {
    @Id
    private String id;
    private String employeeId;
    private String managerId;
    private String reason;
    private String RejectionReason;
    private String status; // pending, approved, rejected
    private LocalDate createdAt;
    private LocalDate updatedAt;
}