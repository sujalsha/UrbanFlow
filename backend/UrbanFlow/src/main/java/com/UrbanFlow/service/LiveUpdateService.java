package com.UrbanFlow.service;

import com.UrbanFlow.dto.AlertDTO;
import com.UrbanFlow.model.Alert;
import com.UrbanFlow.repository.AlertRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class LiveUpdateService {

    private final AlertRepository alertRepository;

    @Autowired
    public LiveUpdateService(AlertRepository alertRepository) {
        this.alertRepository = alertRepository;
    }

    /**
     * Simulate fetching real-time transit status for a given route.
     */
    public String getRealTimeStatus(String routeId) {
        // Simulated statuses; in production, you'd integrate with a GTFS-RT feed.
        String[] statuses = {"On Time", "Delayed", "Cancelled", "Running with minor delays"};
        Random random = new Random();
        return statuses[random.nextInt(statuses.length)];
    }

    /**
     * Get all service alerts.
     */
    public List<AlertDTO> getServiceAlerts() {
        List<Alert> alerts = alertRepository.findAll();
        return alerts.stream().map(alert -> {
            AlertDTO dto = new AlertDTO();
            dto.setId(alert.getId());
            dto.setRouteId(alert.getRouteId());
            dto.setMessage(alert.getMessage());
            dto.setSeverity(alert.getSeverity());
            return dto;
        }).collect(Collectors.toList());
    }

    /**
     * Add a new service alert.
     * (This endpoint should be restricted to Admin users via security configuration.)
     */
    public AlertDTO addServiceAlert(AlertDTO alertDTO) {
        Alert alert = new Alert();
        alert.setRouteId(alertDTO.getRouteId());
        alert.setMessage(alertDTO.getMessage());
        alert.setSeverity(alertDTO.getSeverity());
        alert.setCreatedAt(LocalDateTime.now());
        Alert savedAlert = alertRepository.save(alert);

        AlertDTO response = new AlertDTO();
        response.setId(savedAlert.getId());
        response.setRouteId(savedAlert.getRouteId());
        response.setMessage(savedAlert.getMessage());
        response.setSeverity(savedAlert.getSeverity());
        return response;
    }
}
