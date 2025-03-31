package com.UrbanFlow.repository;

import com.UrbanFlow.model.SessionToken;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface SessionRepository extends JpaRepository<SessionToken, Long> {
    Optional<SessionToken> findByToken(String token);
    void deleteByToken(String token);
}
