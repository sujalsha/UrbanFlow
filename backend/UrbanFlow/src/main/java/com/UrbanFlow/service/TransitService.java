package com.UrbanFlow.service;

import com.UrbanFlow.dto.RouteDTO;
import com.UrbanFlow.dto.StopDTO;
import com.UrbanFlow.dto.ScheduleDTO;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class TransitService {

    private final RestTemplate restTemplate;
    private final String TFL_BASE_URL = "https://api.tfl.gov.uk";

    public TransitService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    /**
     * Fetch available transit modes from the TfL API.
     */
    public List<String> getTransitModes() {
        String url = TFL_BASE_URL + "/Line/Meta/Modes";
        ResponseEntity<List<Map<String, Object>>> response = restTemplate.exchange(
                url, HttpMethod.GET, null, new ParameterizedTypeReference<>() {}
        );

        List<Map<String, Object>> modesList = response.getBody();
        List<String> modes = new ArrayList<>();

        if (modesList != null) {
            for (Map<String, Object> mode : modesList) {
                modes.add(String.valueOf(mode.get("modeName")).toUpperCase());
            }
        }
        return modes;
    }

    /**
     * Fetch all transit routes for the "bus" mode.
     * (The TfL API endpoint /Line/Mode/bus returns routes for buses.)
     */
    public List<RouteDTO> getRoutes() {
        // Use the mode-specific endpoint for bus routes.
        String url = TFL_BASE_URL + "/Line/Mode/bus";
        ResponseEntity<List<Map<String, Object>>> response = restTemplate.exchange(
                url, HttpMethod.GET, null, new ParameterizedTypeReference<>() {}
        );

        List<Map<String, Object>> lines = response.getBody();
        List<RouteDTO> routes = new ArrayList<>();

        if (lines != null) {
            for (Map<String, Object> line : lines) {
                RouteDTO dto = new RouteDTO();
                dto.setId(String.valueOf(line.get("id")));
                dto.setName(String.valueOf(line.get("name")));
                // modeName is not always returned; we already know it's "bus"
                dto.setMode("BUS");
                dto.setOrigin("Unknown");
                dto.setDestination("Unknown");
                routes.add(dto);
            }
        }
        return routes;
    }

    /**
     * Fetch all stops for a given route using the TfL API.
     */
    public List<StopDTO> getStopsForRoute(String routeId) {
        String url = TFL_BASE_URL + "/Line/" + routeId + "/StopPoints";
        ResponseEntity<List<Map<String, Object>>> response = restTemplate.exchange(
                url, HttpMethod.GET, null, new ParameterizedTypeReference<>() {}
        );

        List<Map<String, Object>> stopsList = response.getBody();
        List<StopDTO> stops = new ArrayList<>();

        if (stopsList != null) {
            for (Map<String, Object> stop : stopsList) {
                StopDTO s = new StopDTO();
                s.setId(String.valueOf(stop.get("id")));
                s.setName(String.valueOf(stop.get("commonName")));
                try {
                    s.setLatitude(Double.parseDouble(String.valueOf(stop.get("lat"))));
                    s.setLongitude(Double.parseDouble(String.valueOf(stop.get("lon"))));
                } catch (Exception e) {
                    s.setLatitude(0);
                    s.setLongitude(0);
                }
                stops.add(s);
            }
        }
        return stops;
    }

    /**
     * Fetch transit schedule (arrival times) for a specific stop using the TfL API.
     */
    public ScheduleDTO getScheduleForStop(String stopId) {
        String url = TFL_BASE_URL + "/StopPoint/" + stopId + "/Arrivals";

        ResponseEntity<List<Map<String, Object>>> response = restTemplate.exchange(
                url, HttpMethod.GET, null, new ParameterizedTypeReference<>() {}
        );

        List<Map<String, Object>> arrivals = response.getBody();
        List<String> departureTimes = new ArrayList<>();

        if (arrivals != null) {
            for (Map<String, Object> arrival : arrivals) {
                String expectedArrival = (String) arrival.get("expectedArrival");
                departureTimes.add(expectedArrival);
            }
        }

        ScheduleDTO schedule = new ScheduleDTO();
        schedule.setStopId(stopId);
        schedule.setDepartureTimes(departureTimes);

        return schedule;
    }
}
