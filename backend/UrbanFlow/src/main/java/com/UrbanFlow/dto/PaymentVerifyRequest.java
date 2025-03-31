package com.UrbanFlow.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class PaymentVerifyRequest {
    @NotBlank
    private String transactionId;
}
