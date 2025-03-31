package com.UrbanFlow.dto;

import lombok.Data;

@Data
public class ETAResponseDTO {
    private String stopId;
    private int etaMinutes;  // Estimated arrival time in minutes
}
