package com.UrbanFlow.service;

import com.UrbanFlow.dto.SignupRequest;
import com.UrbanFlow.dto.LoginRequest;
import com.UrbanFlow.model.User;
import com.UrbanFlow.model.Role;
import com.UrbanFlow.model.SessionToken;
import com.UrbanFlow.repository.UserRepository;
import com.UrbanFlow.repository.SessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final SessionRepository sessionRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public AuthService(UserRepository userRepository, SessionRepository sessionRepository) {
        this.userRepository = userRepository;
        this.sessionRepository = sessionRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public User register(SignupRequest request) {
        // Check if the username already exists
        if(userRepository.findByUsername(request.getUsername()).isPresent()){
            throw new RuntimeException("Username already exists");
        }

        // Create and save the new user
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        // If role is provided, validate and set it; otherwise default to USER
        if (request.getRole() != null && !request.getRole().isBlank()) {
            try {
                user.setRole(Role.valueOf(request.getRole().toUpperCase()));
            } catch (IllegalArgumentException e) {
                throw new RuntimeException("Invalid role provided. Allowed roles: USER, ADMIN, DRIVER, CONDUCTOR.");
            }
        } else {
            user.setRole(Role.USER);
        }

        return userRepository.save(user);
    }

    public SessionToken login(LoginRequest request) {
        Optional<User> userOpt = userRepository.findByUsername(request.getUsername());
        if(userOpt.isEmpty()){
            throw new RuntimeException("Invalid username or password");
        }
        User user = userOpt.get();
        if(!passwordEncoder.matches(request.getPassword(), user.getPassword())){
            throw new RuntimeException("Invalid username or password");
        }

        // Generate a new UUID session token
        String token = UUID.randomUUID().toString();
        SessionToken sessionToken = new SessionToken();
        sessionToken.setToken(token);
        sessionToken.setUser(user);

        return sessionRepository.save(sessionToken);
    }

    public void logout(String token) {
        sessionRepository.deleteByToken(token);
    }

    public User getProfile(String token) {
        SessionToken sessionToken = sessionRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid session token"));
        return sessionToken.getUser();
    }
}
