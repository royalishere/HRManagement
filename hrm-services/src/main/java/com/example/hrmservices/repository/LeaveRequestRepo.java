package com.example.hrmservices.repository;

import com.example.hrmservices.model.LeaveRequest;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface LeaveRequestRepo extends MongoRepository<LeaveRequest, String> {

    // Lấy danh sách yêu cầu nghỉ phép của một nhân viên theo employeeId
    List<LeaveRequest> findByEmployeeId(String employeeId);

    // Lấy danh sách yêu cầu nghỉ phép của các nhân viên thuộc quản lý (managerId)
    List<LeaveRequest> findByManagerId(String managerId);

    // Lấy danh sách yêu cầu nghỉ phép theo trạng thái (pending, approved, rejected)
    List<LeaveRequest> findByStatus(String status);

}
