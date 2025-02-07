package com.example.hrmservices.repository;

import com.example.hrmservices.model.Employee;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;


public interface EmployeeRepo extends MongoRepository<Employee, String> {
    Optional<Employee> findByEmail(String email);

    List<Employee> findByManagerId(String managerId);
}