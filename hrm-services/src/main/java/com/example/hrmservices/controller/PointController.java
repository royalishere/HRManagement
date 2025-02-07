package com.example.hrmservices.controller;

import com.example.hrmservices.dto.RegResponse;
import com.example.hrmservices.model.Point;
import com.example.hrmservices.service.PointService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:5000")
@RequestMapping("/api/points")
@RequiredArgsConstructor

public class PointController {

    private final PointService pointService;

    @GetMapping("/initialize-points")
    public String initializePoints() {
        pointService.initializePointsForEmployees();
        return "Points initialized for all employees!";
    }

    @GetMapping("/getAllPoints")
    public ResponseEntity<Iterable<Point>> getAllPoints() {
        return ResponseEntity.ok(pointService.getAllPoints());
    }

    @PostMapping("/add")
    public String addPoints(@RequestParam String email, @RequestParam double points) {
        return pointService.addPoints(email, points);
    }

    @PostMapping("/transfer")
    public String transferPoints(@RequestParam String emailFrom, @RequestParam String emailTo, @RequestParam double points) {
        return pointService.transferPoints(emailFrom, emailTo, points);
    }

    @PostMapping("/reward")
    public ResponseEntity<String> redeemReward(@RequestParam String id, @RequestParam double rewardPoints) {
        String response = pointService.Reward(id, rewardPoints);

        if (response.contains("successfully")) {
            return ResponseEntity.ok(response); // Success response
        } else {
            return ResponseEntity.badRequest().body(response); // Error response
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Point> getPointById(@PathVariable String id) {
        return ResponseEntity.ok(pointService.getPointById(id));
    }
}

