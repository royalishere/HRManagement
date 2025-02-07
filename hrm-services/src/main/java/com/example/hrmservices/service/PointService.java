package com.example.hrmservices.service;

import com.example.hrmservices.model.Employee;
import com.example.hrmservices.model.Point;
import com.example.hrmservices.repository.PointRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PointService {
    @Autowired
    private PointRepo pointRepo;
    @Autowired
    private EmployeeService employeeService;

    public void initializePointsForEmployees() {
        List<Employee> employees = employeeService.getAllEmployees();

        // Lặp qua danh sách email và thêm dữ liệu vào MongoDB
        for (Employee employee : employees) {
            // Kiểm tra nếu email đã tồn tại trong bảng Point
            if (!pointRepo.existsByEmail(employee.getEmail())) {
                Point point = new Point();
                point.setId(employee.getId());
                point.setEmail(employee.getEmail());
                point.setPoint(0); // Điểm ban đầu là 0
                pointRepo.save(point);
            } else {
                System.out.println("Employee with email " + employee.getEmail() + " already exists in Point collection.");
            }
        }
    }

    public List<Point> getAllPoints() {
        return pointRepo.findAll();
    }

    public String addPoints(String email, double pointsToAdd) {
        // Tìm nhân viên trong bảng Point bằng email
        Optional<Point> OptinalPoint = pointRepo.findByEmail(email);
        if (OptinalPoint.isEmpty()) {
            return "Employee with email " + email + " not found.";
        }

        // Cập nhật điểm
        Point point = OptinalPoint.get();
        point.setPoint(point.getPoint() + pointsToAdd);
        pointRepo.save(point);

        return "Added " + pointsToAdd + " points to employee with email " + email + ".";
    }

    public String transferPoints(String emailFrom, String emailTo, double points) {
        // Tìm người gửi và người nhận trong bảng Point
        Optional<Point> OptionalSender = pointRepo.findByEmail(emailFrom);
        Optional<Point> OptionalReceiver = pointRepo.findByEmail(emailTo);

        // Kiểm tra xem cả người gửi và người nhận đều tồn tại
        if (OptionalSender.isEmpty()) {
            return "Sender with email " + emailFrom + " not found.";
        }
        if (OptionalReceiver.isEmpty()) {
            Employee employee = employeeService.getEmployeeByEmail(emailTo);
            if (employee != null) {
                Point point = new Point();
                point.setId(employee.getId());
                point.setEmail(employee.getEmail());
                point.setPoint(0); // Điểm ban đầu là 0
                pointRepo.save(point);
            }
            else {
                return "Receiver with email " + emailTo + " not found.";
            }
        }
        Optional<Point> OptionalReceiver1 = pointRepo.findByEmail(emailTo);
        Point sender = OptionalSender.get();
        Point receiver = OptionalReceiver1.get();
        // Kiểm tra xem người gửi có đủ điểm không
        if (sender.getPoint() < points) {
            return "Sender does not have enough points.";
        }

        // Thực hiện chuyển điểm
        sender.setPoint(sender.getPoint() - points);
        receiver.setPoint(receiver.getPoint() + points);

        // Lưu thông tin cập nhật vào cơ sở dữ liệu
        pointRepo.save(sender);
        pointRepo.save(receiver);

        return "Transferred " + points + " points from " + emailFrom + " to " + emailTo + ".";
    }

    public Point getPointById(String id) {
        Optional<Point> point = pointRepo.findById(id);
        return point.orElse(null);
    }

    public String Reward(String id, double rewardPoints) {
        // Tìm điểm của nhân viên theo ID
        Optional<Point> optionalPoint = pointRepo.findById(id);
        if (optionalPoint.isEmpty()) {
            return "Employee with ID " + id + " not found.";
        }

        // Lấy thông tin điểm của nhân viên
        Point point = optionalPoint.get();

        // Kiểm tra xem nhân viên có đủ điểm để đổi thưởng không
        if (point.getPoint() < rewardPoints) {
            return "Employee does not have enough points to redeem this reward.";
        }

        // Cập nhật điểm của nhân viên sau khi đổi thưởng
        point.setPoint(point.getPoint() - rewardPoints);

        // Lưu lại thông tin cập nhật vào cơ sở dữ liệu
        pointRepo.save(point);

        return "Reward redeemed successfully! " + rewardPoints + " points deducted from employee with ID " + id + ".";
    }

}
