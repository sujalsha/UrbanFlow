package com.UrbanFlow.dto;

import lombok.Data;
import java.util.List;

@Data
public class RoutePlanDTO {
    private String polyline;
    private double distance; // in meters
    private double time;     // in seconds
    // Optionally, you can include a list of coordinates (not parsed in this simple version)
    private List<Coordinate> coordinates;

    @Data
    public static class Coordinate {
        private double lat;
        private double lon;
    }
}
