package com.UrbanFlow.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class PaymentDTO {
    private Long id;
    private Long userId;
    private Double amount;
    private String currency;
    private String status;
    private String transactionId;
    private LocalDateTime createdAt;
}
