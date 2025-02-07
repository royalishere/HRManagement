package com.example.hrmservices.repository;

import com.example.hrmservices.model.Reward;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface RewardRepo extends MongoRepository<Reward, String> {
    Optional<Reward> findByName(String name);

}
