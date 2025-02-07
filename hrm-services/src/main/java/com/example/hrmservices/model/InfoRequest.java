package com.example.hrmservices.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "info_requests")
@Data
public class InfoRequest {
    @Id
    private String id;
    private String employeeId;
    private String managerId;
    // attributes that can be changed
    private String changedBankAccount;
    private String changedEmail;
    private String changedDepartment;
    private String changedRole;
    private String changedEducationLevel;
    private String RejectionReason;
    private String status; // pending, approved, rejected
    private LocalDate createdAt;
    private LocalDate updatedAt;

}