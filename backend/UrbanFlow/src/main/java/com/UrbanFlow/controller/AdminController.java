package com.UrbanFlow.controller;

import com.UrbanFlow.dto.AdminRouteRequestDTO;
import com.UrbanFlow.dto.AdminStopRequestDTO;
import com.UrbanFlow.model.Route;
import com.UrbanFlow.model.Stop;
import com.UrbanFlow.service.AdminTransitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminTransitService adminTransitService;

    @Autowired
    public AdminController(AdminTransitService adminTransitService) {
        this.adminTransitService = adminTransitService;
    }

    /**
     * POST /api/admin/addRoute
     * Add a new transit route.
     */
    @PostMapping("/addRoute")
    public ResponseEntity<Route> addRoute(@RequestBody AdminRouteRequestDTO dto) {
        Route route = adminTransitService.addRoute(dto);
        return ResponseEntity.ok(route);
    }

    /**
     * PUT /api/admin/updateRoute/{routeId}
     * Update transit route details.
     */
    @PutMapping("/updateRoute/{routeId}")
    public ResponseEntity<Route> updateRoute(@PathVariable String routeId, @RequestBody AdminRouteRequestDTO dto) {
        Route route = adminTransitService.updateRoute(routeId, dto);
        return ResponseEntity.ok(route);
    }

    /**
     * DELETE /api/admin/deleteRoute/{routeId}
     * Delete a transit route.
     */
    @DeleteMapping("/deleteRoute/{routeId}")
    public ResponseEntity<String> deleteRoute(@PathVariable String routeId) {
        adminTransitService.deleteRoute(routeId);
        return ResponseEntity.ok("Route deleted successfully");
    }

    /**
     * POST /api/admin/addStop/{routeId}
     * Add a new stop to a route.
     */
    @PostMapping("/addStop/{routeId}")
    public ResponseEntity<Stop> addStop(@PathVariable String routeId, @RequestBody AdminStopRequestDTO dto) {
        Stop stop = adminTransitService.addStop(routeId, dto);
        return ResponseEntity.ok(stop);
    }

    /**
     * DELETE /api/admin/deleteStop/{stopId}
     * Delete a stop from a route.
     */
    @DeleteMapping("/deleteStop/{stopId}")
    public ResponseEntity<String> deleteStop(@PathVariable String stopId) {
        adminTransitService.deleteStop(stopId);
        return ResponseEntity.ok("Stop deleted successfully");
    }
}
