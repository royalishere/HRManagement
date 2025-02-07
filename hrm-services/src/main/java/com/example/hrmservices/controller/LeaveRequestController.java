package com.example.hrmservices.controller;

import com.example.hrmservices.model.LeaveRequest;
import com.example.hrmservices.service.LeaveRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:5000")
@RequestMapping("/api/leave-requests")
public class LeaveRequestController {

    @Autowired
    private LeaveRequestService leaveRequestService;

    // Tạo yêu cầu nghỉ phép
    @PostMapping
    public LeaveRequest createLeaveRequest(@RequestBody LeaveRequest leaveRequest) {
        return leaveRequestService.createLeaveRequest(leaveRequest);
    }

    // Lấy yêu cầu nghỉ phép theo ID
    @GetMapping("/{requestId}")
    public LeaveRequest getLeaveRequestById(@PathVariable String requestId) {
        return leaveRequestService.getLeaveRequestById(requestId);
    }

    // Lấy danh sách yêu cầu nghỉ phép của nhân viên
    @GetMapping("/employee/{employeeId}")
    public List<LeaveRequest> getRequestsByEmployee(@PathVariable String employeeId) {
        return leaveRequestService.getRequestsByEmployee(employeeId);
    }

    // Lấy danh sách yêu cầu nghỉ phép của nhân viên thuộc quản lý
    @GetMapping("/manager/{managerId}")
    public List<LeaveRequest> getRequestsByManager(@PathVariable String managerId) {
        return leaveRequestService.getRequestsByManager(managerId);
    }

    // Cập nhật trạng thái yêu cầu nghỉ phép
    @PutMapping("/{requestId}")
    public LeaveRequest updateRequestStatus(
            @PathVariable String requestId,
            @RequestParam String managerId,
            @RequestParam String status,
            @RequestParam(required = false) String rejectionReason) {
        return leaveRequestService.updateRequestStatus(requestId, managerId, status, rejectionReason);
    }
}
