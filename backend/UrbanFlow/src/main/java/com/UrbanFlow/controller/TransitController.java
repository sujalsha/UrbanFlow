package com.UrbanFlow.controller;

import com.UrbanFlow.dto.RouteDTO;
import com.UrbanFlow.dto.StopDTO;
import com.UrbanFlow.dto.ScheduleDTO;
import com.UrbanFlow.service.TransitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transit")
public class TransitController {

    private final TransitService transitService;

    @Autowired
    public TransitController(TransitService transitService) {
        this.transitService = transitService;
    }

    @GetMapping("/modes")
    public ResponseEntity<List<String>> getTransitModes() {
        return ResponseEntity.ok(transitService.getTransitModes());
    }

    @GetMapping("/routes")
    public ResponseEntity<List<RouteDTO>> getRoutes() {
        return ResponseEntity.ok(transitService.getRoutes());
    }

    @GetMapping("/stops/{routeId}")
    public ResponseEntity<List<StopDTO>> getStopsForRoute(@PathVariable String routeId) {
        return ResponseEntity.ok(transitService.getStopsForRoute(routeId));
    }

    @GetMapping("/schedule/{stopId}")
    public ResponseEntity<ScheduleDTO> getScheduleForStop(@PathVariable String stopId) {
        return ResponseEntity.ok(transitService.getScheduleForStop(stopId));
    }
}
