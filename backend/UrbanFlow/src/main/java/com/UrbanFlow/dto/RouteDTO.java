package com.UrbanFlow.dto;

import lombok.Data;

@Data
public class RouteDTO {
    private String id;         // TfL Line ID (e.g., "12", "victoria")
    private String name;       // TfL Line Name (e.g., "Victoria Line", "Bus 12")
    private String mode;       // Transport Mode (e.g., "BUS", "TUBE", "DLR")
    private String origin;     // Placeholder (TfL API doesn't provide this directly)
    private String destination;
}
