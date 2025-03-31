package com.UrbanFlow.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "alerts")
@Data
@NoArgsConstructor
public class Alert {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Optional: Associate the alert with a specific route; can be null for global alerts.
    private String routeId;

    @Column(nullable = false)
    private String message;

    private String severity; // e.g., "INFO", "WARNING", "CRITICAL"

    private LocalDateTime createdAt = LocalDateTime.now();
}
