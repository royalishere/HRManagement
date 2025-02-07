package com.example.hrmservices.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RegResponse {
    private String id;
    private String email;
    private String role;
}
