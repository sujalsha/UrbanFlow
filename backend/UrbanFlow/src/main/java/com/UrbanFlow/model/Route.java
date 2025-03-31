package com.UrbanFlow.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "routes")
@Data
public class Route {
    @Id
    private String id;  // TfL Line IDs are usually Strings (e.g., "victoria", "bus-12")

    @Column(nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    private TransitMode mode;

    private String origin;
    private String destination;
}
