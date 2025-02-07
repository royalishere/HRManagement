package com.example.hrmservices.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "campaigns")
@Data
public class Campaign {
    @Id
    private String id;
    private String name;
    private String description;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private LocalDateTime creationTime;
    private int maxParticipants;
    private String createdBy;
    private boolean isVisible;
}