package com.UrbanFlow.repository;

import com.UrbanFlow.model.Alert;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AlertRepository extends JpaRepository<Alert, Long> {
    List<Alert> findByRouteId(String routeId);
}
