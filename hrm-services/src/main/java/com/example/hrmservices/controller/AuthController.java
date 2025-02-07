package com.example.hrmservices.controller;

import com.example.hrmservices.dto.AuthResponse;
import com.example.hrmservices.dto.RegResponse;
import com.example.hrmservices.model.User;
import com.example.hrmservices.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("http://localhost:5000")
public class AuthController {

    @Autowired
    private AuthService authService;

    @GetMapping("/{id}")
    public User getUserById(@PathVariable String id) {
        return authService.getUserById(id);
    }

    @PostMapping("/register")
    public RegResponse register(@RequestBody User user) {
        return authService.register(user);
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody User user) {
        return authService.login(user);
    }

    @PostMapping("/change-password")
    public AuthResponse changePassword(@RequestParam String id, @RequestParam String oldPassword, @RequestParam String newPassword) {
        return authService.changePassword(id, oldPassword, newPassword);
    }
}
