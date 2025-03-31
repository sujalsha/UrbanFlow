package com.UrbanFlow.dto;

import lombok.Data;

@Data
public class AdminRouteRequestDTO {
    // The route ID can be provided by the admin.
    private String id;
    private String name;
    // Mode as string; will be converted to TransitMode enum.
    private String mode;
    private String origin;
    private String destination;
}
