package com.UrbanFlow.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class PaymentCheckoutRequest {

    @NotNull
    private Long userId;

    @NotNull
    private Double amount;

    @NotNull
    private String currency;

    // Optionally, you can include additional fields like ticketId if needed.
}
