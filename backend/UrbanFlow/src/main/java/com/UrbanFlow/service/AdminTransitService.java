package com.UrbanFlow.service;

import com.UrbanFlow.dto.AdminRouteRequestDTO;
import com.UrbanFlow.dto.AdminStopRequestDTO;
import com.UrbanFlow.model.Route;
import com.UrbanFlow.model.Stop;
import com.UrbanFlow.model.TransitMode;
import com.UrbanFlow.repository.RouteRepository;
import com.UrbanFlow.repository.StopRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdminTransitService {

    private final RouteRepository routeRepository;
    private final StopRepository stopRepository;

    public AdminTransitService(RouteRepository routeRepository, StopRepository stopRepository) {
        this.routeRepository = routeRepository;
        this.stopRepository = stopRepository;
    }

    /**
     * Add a new transit route.
     */
    public Route addRoute(AdminRouteRequestDTO dto) {
        // Create a new route entity.
        Route route = new Route();
        route.setId(dto.getId());
        route.setName(dto.getName());
        try {
            route.setMode(TransitMode.valueOf(dto.getMode().toUpperCase()));
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid mode. Allowed modes: " + java.util.Arrays.toString(TransitMode.values()));
        }
        route.setOrigin(dto.getOrigin());
        route.setDestination(dto.getDestination());
        return routeRepository.save(route);
    }

    /**
     * Update transit route details.
     */
    public Route updateRoute(String routeId, AdminRouteRequestDTO dto) {
        Optional<Route> optionalRoute = routeRepository.findById(routeId);
        if (!optionalRoute.isPresent()) {
            throw new RuntimeException("Route not found");
        }
        Route route = optionalRoute.get();
        route.setName(dto.getName());
        try {
            route.setMode(TransitMode.valueOf(dto.getMode().toUpperCase()));
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid mode. Allowed modes: " + java.util.Arrays.toString(TransitMode.values()));
        }
        route.setOrigin(dto.getOrigin());
        route.setDestination(dto.getDestination());
        return routeRepository.save(route);
    }

    /**
     * Delete a transit route.
     */
    public void deleteRoute(String routeId) {
        routeRepository.deleteById(routeId);
    }

    /**
     * Add a new stop to a route.
     * (For simplicity, this method just creates a stop record.
     * In a more advanced system, you might associate stops with routes.)
     */
    public Stop addStop(String routeId, AdminStopRequestDTO dto) {
        // You could check if the route exists if desired.
        Stop stop = new Stop();
        stop.setId(dto.getId());
        stop.setName(dto.getName());
        stop.setLatitude(dto.getLatitude());
        stop.setLongitude(dto.getLongitude());
        return stopRepository.save(stop);
    }

    /**
     * Delete a stop.
     */
    public void deleteStop(String stopId) {
        stopRepository.deleteById(stopId);
    }
}
