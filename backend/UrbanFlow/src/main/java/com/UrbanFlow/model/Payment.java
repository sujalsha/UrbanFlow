package com.UrbanFlow.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "payments")
@Data
@NoArgsConstructor
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Many payments can belong to one user.
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // Payment amount in given currency
    private Double amount;

    // Currency code, e.g., "USD", "EUR", etc.
    private String currency;

    // Payment status: e.g., "SUCCESS", "PENDING", "FAILED"
    private String status = "PENDING";

    // Dummy transaction ID (e.g., "TXN123456")
    private String transactionId;

    // Timestamp when the payment was created
    private LocalDateTime createdAt = LocalDateTime.now();
}
