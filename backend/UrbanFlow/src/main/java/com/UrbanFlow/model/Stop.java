package com.UrbanFlow.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "stops")
@Data
public class Stop {
    @Id
    private String id;  // TfL StopPoint ID is alphanumeric (e.g., "940GZZLUASL")

    @Column(nullable = false)
    private String name;

    private double latitude;
    private double longitude;
}
