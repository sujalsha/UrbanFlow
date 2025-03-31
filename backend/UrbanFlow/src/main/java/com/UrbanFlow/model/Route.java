package com.UrbanFlow.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "routes")
@Data
@NoArgsConstructor
public class Route {
    @Id
    private String id;  // e.g., "12", "victoria"

    @Column(nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    private TransitMode mode;

    private String origin;
    private String destination;
}
