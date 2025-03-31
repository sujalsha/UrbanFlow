package com.UrbanFlow.controller;

import com.UrbanFlow.dto.BookTicketRequest;
import com.UrbanFlow.dto.TicketDTO;
import com.UrbanFlow.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    private final TicketService ticketService;

    @Autowired
    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    /**
     * Book a transit ticket.
     * (For simplicity, userId is provided as a query parameter.
     * In a real app, it would be extracted from the session.)
     */
    @PostMapping("/book")
    public ResponseEntity<TicketDTO> bookTicket(@RequestParam Long userId, @RequestBody BookTicketRequest request) {
        TicketDTO ticketDTO = ticketService.bookTicket(userId, request);
        return ResponseEntity.ok(ticketDTO);
    }

    /**
     * View a user's booked tickets.
     */
    @GetMapping("/myTickets")
    public ResponseEntity<List<TicketDTO>> getMyTickets(@RequestParam Long userId) {
        List<TicketDTO> tickets = ticketService.getMyTickets(userId);
        return ResponseEntity.ok(tickets);
    }

    /**
     * Cancel a booked ticket.
     */
    @PostMapping("/cancel/{ticketId}")
    public ResponseEntity<TicketDTO> cancelTicket(@PathVariable Long ticketId) {
        TicketDTO ticketDTO = ticketService.cancelTicket(ticketId);
        return ResponseEntity.ok(ticketDTO);
    }

    /**
     * Generate a QR code for a given ticket.
     */
    @PostMapping("/generateQR/{ticketId}")
    public ResponseEntity<String> generateQRCode(@PathVariable Long ticketId) {
        try {
            String qrCodeBase64 = ticketService.generateQRCode(ticketId);
            return ResponseEntity.ok(qrCodeBase64);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error generating QR code: " + e.getMessage());
        }
    }

    /**
     * Validate a scanned QR code.
     */
    @PostMapping("/validateQR")
    public ResponseEntity<Boolean> validateQRCode(@RequestBody String qrText) {
        boolean isValid = ticketService.validateQRCode(qrText);
        return ResponseEntity.ok(isValid);
    }
}
