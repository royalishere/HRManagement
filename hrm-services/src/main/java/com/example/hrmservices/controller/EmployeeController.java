package com.example.hrmservices.controller;

import com.example.hrmservices.dto.RegResponse;
import com.example.hrmservices.model.Department;
import com.example.hrmservices.model.Employee;
import com.example.hrmservices.service.EmployeeService;
import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:5000")
@RequestMapping("/api/employees")
@RequiredArgsConstructor
public class EmployeeController {

    private final EmployeeService employeeService;

    @GetMapping
    public ResponseEntity<Iterable<Employee>> getAllEmployees() {
        return ResponseEntity.ok(employeeService.getAllEmployees());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable String id) {
        return ResponseEntity.ok(employeeService.getEmployeeById(id));
    }

    @GetMapping("/email")
    public ResponseEntity<Employee> getEmployeeByEmail(@RequestParam String email) {
        return ResponseEntity.ok(employeeService.getEmployeeByEmail(email));
    }

    @PostMapping("/create")
    public ResponseEntity<RegResponse> createEmployee(@RequestBody Employee employee) {
        return ResponseEntity.ok(employeeService.createEmployee(employee));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Employee> updateBasicInfo(
            @PathVariable String id,
            @RequestBody Employee updatedInfo
    ) {
        Employee updatedEmployee = employeeService.updateBasicInfo(id, updatedInfo);
        return ResponseEntity.ok(updatedEmployee);
    }

    @PutMapping("info/{id}")
    public ResponseEntity<Employee> updateEmployeeInfo(
            @PathVariable String id,
            @RequestBody Employee updatedInfo
    ) {
        Employee updatedEmployee = employeeService.updateEmployee(id, updatedInfo);
        return ResponseEntity.ok(updatedEmployee);
    }

    // Lấy danh sách nhân viên thuộc managerId
    @GetMapping("/manager/{managerId}")
    public List<Employee> getEmployeesByManager(@PathVariable String managerId) {
        return employeeService.getEmployeesByManager(managerId);
    }
}
