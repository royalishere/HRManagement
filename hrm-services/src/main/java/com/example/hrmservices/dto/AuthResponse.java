package com.example.hrmservices.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {
    private String id;
    private String accessToken;
    private String refreshToken;
    private String role;
}