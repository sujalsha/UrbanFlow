package com.UrbanFlow.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "user_history")
@Data
@NoArgsConstructor
public class UserHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Many history records can belong to one user
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // The route the user traveled
    private String routeId;
    private String routeName;

    // Timestamp when the route was taken
    private LocalDateTime traveledAt = LocalDateTime.now();
}
