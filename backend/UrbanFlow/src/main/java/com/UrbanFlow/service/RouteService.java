package com.UrbanFlow.service;

import com.UrbanFlow.dto.ETAResponseDTO;
import com.UrbanFlow.dto.RoutePlanDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.ArrayList;

@Service
public class RouteService {

    private final RestTemplate restTemplate;

    @Value("${graphhopper.api.key}")
    private String graphhopperApiKey;

    private final String GRAPHHOPPER_BASE_URL = "https://graphhopper.com/api/1/route";

    public RouteService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    /**
     * Get the best route between two locations using GraphHopper (vehicle=car).
     */
    public RoutePlanDTO findBestRoute(double originLat, double originLon, double destLat, double destLon) {
        String url = String.format("%s?point=%f,%f&point=%f,%f&vehicle=car&locale=en&calc_points=true&key=%s",
                GRAPHHOPPER_BASE_URL, originLat, originLon, destLat, destLon, graphhopperApiKey);

        ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
                url, HttpMethod.GET, null, new ParameterizedTypeReference<>() {}
        );

        Map<String, Object> body = response.getBody();
        RoutePlanDTO routePlan = new RoutePlanDTO();
        if (body != null && body.containsKey("paths")) {
            List<Map<String, Object>> paths = (List<Map<String, Object>>) body.get("paths");
            if (!paths.isEmpty()) {
                Map<String, Object> bestPath = paths.get(0);
                routePlan.setDistance(((Number) bestPath.get("distance")).doubleValue());
                routePlan.setTime(((Number) bestPath.get("time")).doubleValue());
                routePlan.setPolyline((String) bestPath.get("points"));
            }
        }
        return routePlan;
    }

    /**
     * Get a multi-modal route (bus + train + walk) between two locations.
     * Here we simulate it by calling GraphHopper with vehicle=foot.
     */
    public RoutePlanDTO getMultiModalRoute(double originLat, double originLon, double destLat, double destLon) {
        String url = String.format("%s?point=%f,%f&point=%f,%f&vehicle=foot&locale=en&calc_points=true&key=%s",
                GRAPHHOPPER_BASE_URL, originLat, originLon, destLat, destLon, graphhopperApiKey);

        ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
                url, HttpMethod.GET, null, new ParameterizedTypeReference<>() {}
        );

        Map<String, Object> body = response.getBody();
        RoutePlanDTO routePlan = new RoutePlanDTO();
        if (body != null && body.containsKey("paths")) {
            List<Map<String, Object>> paths = (List<Map<String, Object>>) body.get("paths");
            if (!paths.isEmpty()) {
                Map<String, Object> bestPath = paths.get(0);
                routePlan.setDistance(((Number) bestPath.get("distance")).doubleValue());
                routePlan.setTime(((Number) bestPath.get("time")).doubleValue());
                routePlan.setPolyline((String) bestPath.get("points"));
            }
        }
        return routePlan;
    }

    /**
     * Get real-time estimated arrival time (ETA) for a given stop.
     * Here, we simulate it by returning a random ETA between 1 and 10 minutes.
     */
    public ETAResponseDTO getLiveETA(String stopId) {
        ETAResponseDTO etaResponse = new ETAResponseDTO();
        etaResponse.setStopId(stopId);
        Random random = new Random();
        etaResponse.setEtaMinutes(1 + random.nextInt(10));
        return etaResponse;
    }
}
