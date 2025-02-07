package com.example.hrmservices.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "employees")
@Data
public class Employee {
    @Id
    private String id;
    private String fullName;
    private LocalDate dateOfBirth;
    private String gender;
    private String address;
    private String phoneNumber;
    private String bankAccount;
    private String email;
    private String department;
    private String role; // supervisor, hr, employee
    private String managerId; 
    private String educationLevel;
}