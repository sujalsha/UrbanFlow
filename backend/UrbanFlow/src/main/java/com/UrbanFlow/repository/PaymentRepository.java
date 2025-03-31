package com.UrbanFlow.repository;

import com.UrbanFlow.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    List<Payment> findByUserId(Long userId);
    Payment findByTransactionId(String transactionId);
}
