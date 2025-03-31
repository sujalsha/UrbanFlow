package com.UrbanFlow.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "tickets")
@Data
@NoArgsConstructor
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Many tickets can belong to one user.
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // Route details for which the ticket is booked
    private String routeId;
    private String routeName;

    // Date/time of booking
    private LocalDateTime bookedAt = LocalDateTime.now();

    // Status: BOOKED, CANCELLED, etc.
    private String status = "BOOKED";
}
