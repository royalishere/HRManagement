package com.example.hrmservices.repository;

import com.example.hrmservices.model.Department;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface DepartmentRepo extends MongoRepository<Department, String> {
    Optional<Department> findByName(String name);
}