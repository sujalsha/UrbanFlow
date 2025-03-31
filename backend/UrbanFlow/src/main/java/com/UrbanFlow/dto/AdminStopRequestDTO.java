package com.UrbanFlow.dto;

import lombok.Data;

@Data
public class AdminStopRequestDTO {
    // The stop ID can be provided by the admin.
    private String id;
    private String name;
    private double latitude;
    private double longitude;
}
