package com.UrbanFlow.dto;

import lombok.Data;

@Data
public class AlertDTO {
    private Long id;
    private String routeId;
    private String message;
    private String severity;
}
