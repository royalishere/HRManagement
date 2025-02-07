package com.example.hrmservices.service;

import com.example.hrmservices.dto.RegResponse;
import com.example.hrmservices.model.Employee;
import com.example.hrmservices.model.User;
import com.example.hrmservices.repository.EmployeeRepo;
import com.example.hrmservices.exception.CustomExceptions.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    @Autowired
    private EmployeeRepo employeeRepo;
    @Autowired
    private AuthService authService;
    @Autowired
    private DepartmentService departmentService;

    @Transactional
    public RegResponse createEmployee(Employee employee) {
        if (employeeRepo.findByEmail(employee.getEmail()).isPresent()) {
            throw new EmailAlreadyExistsException("Email already exists!");
        }

        // Save employee to database
        Employee savedEmployee = employeeRepo.save(employee);

        // Add employee to department
        departmentService.addDepartmentMember(employee.getDepartment(), savedEmployee.getId());

        // Call AuthService to create User account
        User user = new User();
        user.setId(savedEmployee.getId());
        user.setEmail(savedEmployee.getEmail());
        user.setPassword("123"); // Default password
        user.setRole(savedEmployee.getRole());

        return authService.register(user);
    }

    public Employee updateBasicInfo(String id, Employee updatedInfo) {
        Optional<Employee> optionalEmployee = employeeRepo.findById(id);
        if (optionalEmployee.isPresent()) {
            Employee employee = optionalEmployee.get();
            if (updatedInfo.getFullName() != null) employee.setFullName(updatedInfo.getFullName());
            if (updatedInfo.getDateOfBirth() != null) employee.setDateOfBirth(updatedInfo.getDateOfBirth());
            if (updatedInfo.getGender() != null) employee.setGender(updatedInfo.getGender());
            if (updatedInfo.getAddress() != null) employee.setAddress(updatedInfo.getAddress());
            if (updatedInfo.getPhoneNumber() != null) employee.setPhoneNumber(updatedInfo.getPhoneNumber());
            return employeeRepo.save(employee);
        } else {
            throw new UserNotFoundException("Employee not found with id: " + id);
        }
    }

    public Employee updateEmployee(String id, Employee updatedInfo) {
        Optional<Employee> optionalEmployee = employeeRepo.findById(id);
        if (optionalEmployee.isPresent()) {
            Employee employee = optionalEmployee.get();
            if (updatedInfo.getFullName() != null) employee.setFullName(updatedInfo.getFullName());
            if (updatedInfo.getDateOfBirth() != null) employee.setDateOfBirth(updatedInfo.getDateOfBirth());
            if (updatedInfo.getGender() != null) employee.setGender(updatedInfo.getGender());
            if (updatedInfo.getAddress() != null) employee.setAddress(updatedInfo.getAddress());
            if (updatedInfo.getPhoneNumber() != null) employee.setPhoneNumber(updatedInfo.getPhoneNumber());
            if (updatedInfo.getBankAccount() != null) employee.setBankAccount(updatedInfo.getBankAccount());
            if (updatedInfo.getEmail() != null) {
                employee.setEmail(updatedInfo.getEmail());
                // set email for user
                User user = authService.getUserById(id);
                user.setEmail(updatedInfo.getEmail());
                authService.updateUser(user);
            }
            if (updatedInfo.getDepartment() != null) {
                departmentService.removeDepartmentMember(employee.getDepartment(), id);
                departmentService.addDepartmentMember(updatedInfo.getDepartment(), id);
                employee.setDepartment(updatedInfo.getDepartment());
            }
            if (updatedInfo.getRole() != null) {
                employee.setRole(updatedInfo.getRole());
                // set role for user
                User user = authService.getUserById(id);
                user.setRole(updatedInfo.getRole());
                authService.updateUser(user);
            }
            if (updatedInfo.getManagerId() != null) employee.setManagerId(updatedInfo.getManagerId());
            if (updatedInfo.getEducationLevel() != null) employee.setEducationLevel(updatedInfo.getEducationLevel());
            return employeeRepo.save(employee);
        } else {
            throw new UserNotFoundException("Employee not found with id: " + id);
        }
    }

    public List<Employee> getAllEmployees() {
        return employeeRepo.findAll();
    }

    public Employee getEmployeeById(String id) {
        Optional<Employee> optionalEmployee = employeeRepo.findById(id);
        if (optionalEmployee.isPresent()) {
            return optionalEmployee.get();
        } else {
            throw new RuntimeException("Employee not found with id: " + id);
        }
    }

    public Employee getEmployeeByEmail(String email) {
        Optional<Employee> optionalEmployee = employeeRepo.findByEmail(email);
        if (optionalEmployee.isPresent()) {
            return optionalEmployee.get();
        } else {
            throw new RuntimeException("Employee not found with email: " + email);
        }
    }

    // Lấy danh sách nhân viên thuộc quản lý
    public List<Employee> getEmployeesByManager(String managerId) {
        return employeeRepo.findByManagerId(managerId);
    }
}
