package com.UrbanFlow.repository;

import com.UrbanFlow.model.UserPreferences;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserPreferencesRepository extends JpaRepository<UserPreferences, Long> {
    Optional<UserPreferences> findByUserId(Long userId);
}
