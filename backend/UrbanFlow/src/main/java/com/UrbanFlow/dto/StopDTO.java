package com.UrbanFlow.dto;

import lombok.Data;

@Data
public class StopDTO {
    private String id;          // TfL StopPoint ID (e.g., "940GZZLUASL")
    private String name;        // TfL Stop Name (e.g., "Oxford Circus")
    private double latitude;
    private double longitude;
}
