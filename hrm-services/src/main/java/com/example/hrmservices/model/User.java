package com.example.hrmservices.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "users")
@Data
public class User {
    @Id
    private String id;
    private String email;
    private String password;
    private String role;
}