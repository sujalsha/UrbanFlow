package com.UrbanFlow.controller;

import com.UrbanFlow.dto.AlertDTO;
import com.UrbanFlow.service.LiveUpdateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/live")
public class LiveUpdateController {

    private final LiveUpdateService liveUpdateService;

    @Autowired
    public LiveUpdateController(LiveUpdateService liveUpdateService) {
        this.liveUpdateService = liveUpdateService;
    }

    /**
     * GET /api/live/status/{routeId}
     * Returns a simulated real-time transit status for the given route.
     */
    @GetMapping("/status/{routeId}")
    public ResponseEntity<String> getRealTimeStatus(@PathVariable String routeId) {
        String status = liveUpdateService.getRealTimeStatus(routeId);
        return ResponseEntity.ok(status);
    }

    /**
     * GET /api/live/alert
     * Returns a list of service alerts.
     */
    @GetMapping("/alert")
    public ResponseEntity<List<AlertDTO>> getServiceAlerts() {
        List<AlertDTO> alerts = liveUpdateService.getServiceAlerts();
        return ResponseEntity.ok(alerts);
    }

    /**
     * POST /api/live/alert
     * Adds a new service alert.
     * This endpoint should be accessible only to Admin users.
     */
    @PostMapping("/alert")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<AlertDTO> addServiceAlert(@RequestBody AlertDTO alertDTO) {
        AlertDTO createdAlert = liveUpdateService.addServiceAlert(alertDTO);
        return ResponseEntity.ok(createdAlert);
    }
}
