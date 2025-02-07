package com.example.hrmservices.service;

import com.example.hrmservices.model.Department;
import com.example.hrmservices.repository.DepartmentRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DepartmentService {

    @Autowired
    private DepartmentRepo departmentRepo;

    public Department addDepartmentMember(String name, String employeeId) {
        Department department = departmentRepo.findByName(name)
                .orElseThrow(() -> new RuntimeException("Department not found: " + name));

        department.setMemberCount(department.getMemberCount() + 1);
        department.getMemberIds().add(employeeId);
        return departmentRepo.save(department);
    }

    public  Department removeDepartmentMember(String name, String employeeId) {
        Department department = departmentRepo.findByName(name)
                .orElseThrow(() -> new RuntimeException("Department not found: " + name));

        department.setMemberCount(department.getMemberCount() - 1);
        department.getMemberIds().remove(employeeId);
        return departmentRepo.save(department);
    }

    public Department getDepartment(String name) {
        return departmentRepo.findByName(name)
                .orElseThrow(() -> new RuntimeException("Department not found: " + name));
    }

    public Department createDepartment(Department department) {
        return departmentRepo.save(department);
    }

    public List<Department> getAllDepartments() {
        return departmentRepo.findAll();
    }
}
