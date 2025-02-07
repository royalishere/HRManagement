package com.example.hrmservices.controller;

import com.example.hrmservices.dto.RegResponse;
import com.example.hrmservices.model.Point;
import com.example.hrmservices.model.Reward;
import com.example.hrmservices.service.PointService;
import com.example.hrmservices.service.RewardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:5000")
@RequestMapping("/api/rewards")
@RequiredArgsConstructor

public class RewardController {

    private final RewardService rewardService;


    @GetMapping()
    public ResponseEntity<Iterable<Reward>> getAllRewards() {
        return ResponseEntity.ok(rewardService.getAllRewards());
    }

    @PostMapping("/add")
    public ResponseEntity<Reward> addReward(@RequestBody Reward reward) {
        return ResponseEntity.ok(rewardService.addReward(reward));
    }
}

