package com.example.hrmservices;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
public class HrmServicesApplication {

	public static void main(String[] args) {
		SpringApplication.run(HrmServicesApplication.class, args);
	}

}
