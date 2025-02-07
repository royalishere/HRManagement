package com.example.hrmservices.repository;

import com.example.hrmservices.model.Point;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface PointRepo extends MongoRepository<Point, String> {
    Optional<Point> findByEmail(String email);
    boolean existsByEmail(String mail);
}
