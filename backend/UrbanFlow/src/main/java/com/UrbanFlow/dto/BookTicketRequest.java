package com.UrbanFlow.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class BookTicketRequest {
    @NotBlank
    private String routeId;

    @NotBlank
    private String routeName;
}
