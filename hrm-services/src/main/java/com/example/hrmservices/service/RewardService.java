package com.example.hrmservices.service;

import com.example.hrmservices.model.Reward;
import com.example.hrmservices.repository.RewardRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RewardService {
    @Autowired
    private RewardRepo rewardRepo;

    public List<Reward> getAllRewards() {
        return rewardRepo.findAll();
    }

    public Reward addReward(Reward reward) {
        return rewardRepo.save(reward);
    }

}
