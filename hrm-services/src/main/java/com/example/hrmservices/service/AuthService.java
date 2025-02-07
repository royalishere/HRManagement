package com.example.hrmservices.service;

import com.example.hrmservices.dto.AuthResponse;
import com.example.hrmservices.dto.RegResponse;
import com.example.hrmservices.model.User;
import com.example.hrmservices.repository.UserRepo;
import com.example.hrmservices.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import com.example.hrmservices.exception.CustomExceptions.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public RegResponse register(User user) {
        if (userRepo.findByEmail(user.getEmail()).isPresent()) {
            throw new EmailAlreadyExistsException("Email already exists");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepo.save(user);
        return new RegResponse(user.getId(), user.getEmail(), user.getRole());
    }


    public AuthResponse login(User user) {
        Optional<User> userOpt = userRepo.findByEmail(user.getEmail());
        if (userOpt.isEmpty()) {
            throw new UserNotFoundException("User not found");
        }
        User dbUser = userOpt.get();
        if (!passwordEncoder.matches(user.getPassword(), dbUser.getPassword())) {
            throw new InvalidPasswordException("Invalid password");
        }
        String accessToken =  jwtUtil.generateAccessToken(user.getEmail());
        String refreshToken =  jwtUtil.generateRefreshToken(user.getEmail());

        return new AuthResponse(dbUser.getId(), accessToken, refreshToken, dbUser.getRole());

    }

    public AuthResponse changePassword(String id, String oldPassword, String newPassword) {
        Optional<User> userOpt = userRepo.findById(id);
        if (userOpt.isEmpty()) {
            throw new UserNotFoundException("User not found");
        }
        User dbUser = userOpt.get();
        if (!passwordEncoder.matches(oldPassword, dbUser.getPassword())) {
            throw new InvalidPasswordException("Invalid password");
        }
        dbUser.setPassword(passwordEncoder.encode(newPassword));
        userRepo.save(dbUser);
        String accessToken = jwtUtil.generateAccessToken(dbUser.getEmail());
        String refreshToken = jwtUtil.generateRefreshToken(dbUser.getEmail());
        return new AuthResponse(dbUser.getId(), accessToken, refreshToken, dbUser.getRole());
    }

    public User getUserById(String id) {
        Optional<User> userOpt = userRepo.findById(id);
        if (userOpt.isEmpty()) {
            throw new UserNotFoundException("User not found");
        }
        return userOpt.get();
    }


    public User updateUser(User user) {
        return userRepo.save(user);
    }
}
