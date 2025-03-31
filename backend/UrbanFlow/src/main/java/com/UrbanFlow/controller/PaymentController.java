package com.UrbanFlow.controller;

import com.UrbanFlow.dto.PaymentCheckoutRequest;
import com.UrbanFlow.dto.PaymentDTO;
import com.UrbanFlow.dto.PaymentVerifyRequest;
import com.UrbanFlow.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    private final PaymentService paymentService;

    @Autowired
    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    /**
     * POST /api/payments/checkout
     * Initiate a dummy payment transaction.
     */
    @PostMapping("/checkout")
    public ResponseEntity<PaymentDTO> checkoutPayment(@Valid @RequestBody PaymentCheckoutRequest request) {
        PaymentDTO dto = paymentService.checkoutPayment(request);
        return ResponseEntity.ok(dto);
    }

    /**
     * POST /api/payments/verify
     * Verify the payment status for a given transaction.
     */
    @PostMapping("/verify")
    public ResponseEntity<PaymentDTO> verifyPayment(@Valid @RequestBody PaymentVerifyRequest request) {
        PaymentDTO dto = paymentService.verifyPayment(request);
        return ResponseEntity.ok(dto);
    }

    /**
     * GET /api/payments/history
     * Retrieve the payment history for a user.
     * (For simplicity, the userId is provided as a query parameter. In a real app, you'd get it from the session.)
     */
    @GetMapping("/history")
    public ResponseEntity<List<PaymentDTO>> getPaymentHistory(@RequestParam Long userId) {
        List<PaymentDTO> history = paymentService.getPaymentHistory(userId);
        return ResponseEntity.ok(history);
    }
}
