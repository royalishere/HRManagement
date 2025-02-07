package com.example.hrmservices.controller;

import com.example.hrmservices.model.Department;
import com.example.hrmservices.service.DepartmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:5000")
@RequestMapping("/api/departments")
@RequiredArgsConstructor
public class DepartmentController {

    private final DepartmentService departmentService;

    @GetMapping
    public ResponseEntity<Iterable<Department>> getAllDepartments() {
        return ResponseEntity.ok(departmentService.getAllDepartments());
    }

    @PostMapping("/create")
    public ResponseEntity<Department> createDepartment(@RequestBody Department department) {
        return ResponseEntity.ok(departmentService.createDepartment(department));
    }

    @PostMapping("/{name}/add")
    public ResponseEntity<Department> addDepartmentMember(
            @PathVariable String name,
            @RequestParam String employeeId
    ) {
        Department department = departmentService.addDepartmentMember(name, employeeId);
        return ResponseEntity.ok(department);
    }

    @PostMapping("/{name}/remove")
    public ResponseEntity<Department> removeDepartmentMember(
            @PathVariable String name,
            @RequestParam String employeeId
    ) {
        Department department = departmentService.removeDepartmentMember(name, employeeId);
        return ResponseEntity.ok(department);
    }

    @GetMapping("/{name}")
    public ResponseEntity<Department> getDepartment(@PathVariable String name) {
        Department department = departmentService.getDepartment(name);
        return ResponseEntity.ok(department);
    }
}
