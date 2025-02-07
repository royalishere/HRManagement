package com.example.hrmservices.repository;

import com.example.hrmservices.model.Campaign;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDateTime;
import java.util.List;


public interface CampaignRepo extends MongoRepository<Campaign, String> {
    List<Campaign> findAllByVisible(boolean visible);
    List<Campaign> findAllByStartTimeAfter(LocalDateTime startTime);
}