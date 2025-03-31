package com.UrbanFlow.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "user_preferences")
@Data
@NoArgsConstructor
public class UserPreferences {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Each user has their own preferences
    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    // List of favorite routes (stored as a comma-separated string)
    private String favoriteRoutes;
}
