package com.UrbanFlow.controller;

import com.UrbanFlow.dto.SignupRequest;
import com.UrbanFlow.dto.LoginRequest;
import com.UrbanFlow.model.SessionToken;
import com.UrbanFlow.model.User;
import com.UrbanFlow.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService){
        this.authService = authService;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody SignupRequest request){
        try {
            User user = authService.register(request);
            return ResponseEntity.ok("User registered successfully with role: " + user.getRole());
        } catch(RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request){
        try {
            SessionToken token = authService.login(request);
            // Return the session token (UUID string)
            return ResponseEntity.ok(token.getToken());
        } catch(RuntimeException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader("X-Session-Token") String token){
        try {
            authService.logout(token);
            return ResponseEntity.ok("Logged out successfully");
        } catch(RuntimeException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(@RequestHeader("X-Session-Token") String token){
        try {
            User user = authService.getProfile(token);
            return ResponseEntity.ok(user);
        } catch(RuntimeException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
