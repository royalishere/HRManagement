package com.example.hrmservices.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;


@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "departments")
@Data
public class Department {
    @Id
    private String id;
    private String name;
    private int memberCount;
    private List<String> memberIds = new ArrayList<>();
}
