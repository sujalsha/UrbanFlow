package com.UrbanFlow.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/system")
public class SystemController {

    /**
     * GET /api/system/health
     * Returns a simple health status.
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> getHealth() {
        Map<String, Object> healthStatus = new HashMap<>();
        healthStatus.put("status", "UP");
        healthStatus.put("timestamp", LocalDateTime.now());
        return ResponseEntity.ok(healthStatus);
    }

    /**
     * GET /api/system/status
     * Returns a dummy server status including active sessions and uptime.
     */
    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> getStatus() {
        Map<String, Object> status = new HashMap<>();
        status.put("server", "Running");
        // For demonstration, using static dummy values for active sessions and uptime.
        status.put("activeSessions", 5);
        status.put("uptime", "48 hours");
        status.put("timestamp", LocalDateTime.now());
        return ResponseEntity.ok(status);
    }
}
