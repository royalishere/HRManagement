package com.example.hrmservices.service;

import com.example.hrmservices.model.Employee;
import com.example.hrmservices.model.LeaveRequest;
import com.example.hrmservices.repository.EmployeeRepo;
import com.example.hrmservices.repository.LeaveRequestRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class LeaveRequestService {

    @Autowired
    private LeaveRequestRepo leaveRequestRepo;

    @Autowired
    private EmployeeRepo employeeRepo;

    // Tạo yêu cầu nghỉ phép
    public LeaveRequest createLeaveRequest(LeaveRequest leaveRequest) {
        String employeeId = leaveRequest.getEmployeeId();
        String managerId = employeeRepo.findById(employeeId)
                .map(Employee::getManagerId)
                .orElseThrow(() -> new IllegalArgumentException("Employee not found!"));

        leaveRequest.setManagerId(managerId);
        leaveRequest.setStatus("pending");
        leaveRequest.setCreatedAt(LocalDate.now());
        leaveRequest.setUpdatedAt(LocalDate.now());

        return leaveRequestRepo.save(leaveRequest);
    }

    // Lấy yêu cầu nghỉ phép theo ID
    public LeaveRequest getLeaveRequestById(String requestId) {
        return leaveRequestRepo.findById(requestId)
                .orElseThrow(() -> new IllegalArgumentException("Leave request not found!"));
    }

    // Lấy danh sách yêu cầu nghỉ phép của nhân viên
    public List<LeaveRequest> getRequestsByEmployee(String employeeId) {
        return leaveRequestRepo.findByEmployeeId(employeeId);
    }

    // Lấy danh sách yêu cầu nghỉ phép của nhân viên thuộc quản lý
    public List<LeaveRequest> getRequestsByManager(String managerId) {
        return leaveRequestRepo.findByManagerId(managerId);
    }

    // Cập nhật trạng thái yêu cầu nghỉ phép
    public LeaveRequest updateRequestStatus(String requestId, String managerId, String status, String rejectionReason) {
        LeaveRequest leaveRequest = getLeaveRequestById(requestId);

        if (!leaveRequest.getManagerId().equals(managerId)) {
            throw new IllegalArgumentException("You are not authorized to update this request.");
        }

        leaveRequest.setStatus(status);
        leaveRequest.setRejectionReason(status.equals("rejected") ? rejectionReason : null);
        leaveRequest.setUpdatedAt(LocalDate.now());

        return leaveRequestRepo.save(leaveRequest);
    }
}
