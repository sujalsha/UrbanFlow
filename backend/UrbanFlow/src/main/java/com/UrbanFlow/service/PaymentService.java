package com.UrbanFlow.service;

import com.UrbanFlow.dto.PaymentCheckoutRequest;
import com.UrbanFlow.dto.PaymentDTO;
import com.UrbanFlow.dto.PaymentVerifyRequest;
import com.UrbanFlow.model.Payment;
import com.UrbanFlow.model.User;
import com.UrbanFlow.repository.PaymentRepository;
import com.UrbanFlow.repository.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final UserRepository userRepository;

    public PaymentService(PaymentRepository paymentRepository, UserRepository userRepository) {
        this.paymentRepository = paymentRepository;
        this.userRepository = userRepository;
    }

    /**
     * Dummy payment checkout.
     * Simulates a payment transaction using Stripe Test Mode or Razorpay Test.
     */
    public PaymentDTO checkoutPayment(PaymentCheckoutRequest request) {
        // Retrieve the user (in real applications, the user comes from the session)
        Optional<User> optionalUser = userRepository.findById(request.getUserId());
        if (!optionalUser.isPresent()) {
            throw new RuntimeException("User not found");
        }
        User user = optionalUser.get();

        Payment payment = new Payment();
        payment.setUser(user);
        payment.setAmount(request.getAmount());
        payment.setCurrency(request.getCurrency());

        // Simulate payment processing: generate a dummy transaction ID and mark status as SUCCESS.
        String transactionId = "TXN" + (100000 + new Random().nextInt(900000));
        payment.setTransactionId(transactionId);
        payment.setStatus("SUCCESS");

        Payment savedPayment = paymentRepository.save(payment);
        PaymentDTO dto = new PaymentDTO();
        BeanUtils.copyProperties(savedPayment, dto);
        dto.setUserId(user.getId());
        return dto;
    }

    /**
     * Dummy payment verification.
     * Checks if a payment with the given transaction ID exists and returns its status.
     */
    public PaymentDTO verifyPayment(PaymentVerifyRequest request) {
        Payment payment = paymentRepository.findByTransactionId(request.getTransactionId());
        if (payment == null) {
            throw new RuntimeException("Payment not found");
        }
        // For dummy verification, simply return the payment details.
        PaymentDTO dto = new PaymentDTO();
        BeanUtils.copyProperties(payment, dto);
        dto.setUserId(payment.getUser().getId());
        return dto;
    }

    /**
     * Retrieve payment history for a given user.
     */
    public List<PaymentDTO> getPaymentHistory(Long userId) {
        List<Payment> payments = paymentRepository.findByUserId(userId);
        return payments.stream().map(payment -> {
            PaymentDTO dto = new PaymentDTO();
            BeanUtils.copyProperties(payment, dto);
            dto.setUserId(payment.getUser().getId());
            return dto;
        }).collect(Collectors.toList());
    }
}
