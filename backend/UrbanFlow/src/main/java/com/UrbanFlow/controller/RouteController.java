package com.UrbanFlow.controller;

import com.UrbanFlow.dto.ETAResponseDTO;
import com.UrbanFlow.dto.RoutePlanDTO;
import com.UrbanFlow.service.RouteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/routes")
public class RouteController {

    private final RouteService routeService;

    @Autowired
    public RouteController(RouteService routeService) {
        this.routeService = routeService;
    }

    /**
     * GET /api/routes/find?originLat=&originLon=&destLat=&destLon=
     * Get the best route between two locations.
     */
    @GetMapping("/find")
    public ResponseEntity<RoutePlanDTO> findBestRoute(
            @RequestParam double originLat,
            @RequestParam double originLon,
            @RequestParam double destLat,
            @RequestParam double destLon) {
        RoutePlanDTO routePlan = routeService.findBestRoute(originLat, originLon, destLat, destLon);
        return ResponseEntity.ok(routePlan);
    }

    /**
     * GET /api/routes/multimodal?originLat=&originLon=&destLat=&destLon=
     * Get a multi-modal route (bus + train + walk).
     */
    @GetMapping("/multimodal")
    public ResponseEntity<RoutePlanDTO> getMultiModalRoute(
            @RequestParam double originLat,
            @RequestParam double originLon,
            @RequestParam double destLat,
            @RequestParam double destLon) {
        RoutePlanDTO routePlan = routeService.getMultiModalRoute(originLat, originLon, destLat, destLon);
        return ResponseEntity.ok(routePlan);
    }

    /**
     * GET /api/routes/liveETA/{stopId}
     * Get real-time estimated arrival time (ETA) for a given stop.
     */
    @GetMapping("/liveETA/{stopId}")
    public ResponseEntity<ETAResponseDTO> getLiveETA(@PathVariable String stopId) {
        ETAResponseDTO etaResponse = routeService.getLiveETA(stopId);
        return ResponseEntity.ok(etaResponse);
    }
}
