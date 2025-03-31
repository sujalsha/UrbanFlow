package com.UrbanFlow.service;

import com.UrbanFlow.dto.BookTicketRequest;
import com.UrbanFlow.dto.TicketDTO;
import com.UrbanFlow.model.Ticket;
import com.UrbanFlow.model.User;
import com.UrbanFlow.repository.TicketRepository;
import com.UrbanFlow.repository.UserRepository;
import com.UrbanFlow.utils.QRCodeGenerator;
import com.google.zxing.WriterException;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class TicketService {

    private final TicketRepository ticketRepository;
    private final UserRepository userRepository;

    public TicketService(TicketRepository ticketRepository, UserRepository userRepository) {
        this.ticketRepository = ticketRepository;
        this.userRepository = userRepository;
    }

    /**
     * Book a ticket for a user. (In a real-world scenario, the user would be determined from the session.)
     */
    public TicketDTO bookTicket(Long userId, BookTicketRequest request) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (!optionalUser.isPresent()) {
            throw new RuntimeException("User not found");
        }
        User user = optionalUser.get();

        Ticket ticket = new Ticket();
        ticket.setUser(user);
        ticket.setRouteId(request.getRouteId());
        ticket.setRouteName(request.getRouteName());
        // The ticket status defaults to "BOOKED" and booking time to now.
        Ticket savedTicket = ticketRepository.save(ticket);

        TicketDTO dto = new TicketDTO();
        BeanUtils.copyProperties(savedTicket, dto);
        dto.setUserId(user.getId());
        return dto;
    }

    /**
     * Retrieve all tickets for a specific user.
     */
    public List<TicketDTO> getMyTickets(Long userId) {
        List<Ticket> tickets = ticketRepository.findByUserId(userId);
        return tickets.stream().map(ticket -> {
            TicketDTO dto = new TicketDTO();
            BeanUtils.copyProperties(ticket, dto);
            dto.setUserId(ticket.getUser().getId());
            return dto;
        }).collect(Collectors.toList());
    }

    /**
     * Cancel a booked ticket.
     */
    public TicketDTO cancelTicket(Long ticketId) {
        Optional<Ticket> optionalTicket = ticketRepository.findById(ticketId);
        if (!optionalTicket.isPresent()) {
            throw new RuntimeException("Ticket not found");
        }
        Ticket ticket = optionalTicket.get();
        ticket.setStatus("CANCELLED");
        Ticket savedTicket = ticketRepository.save(ticket);
        TicketDTO dto = new TicketDTO();
        BeanUtils.copyProperties(savedTicket, dto);
        dto.setUserId(savedTicket.getUser().getId());
        return dto;
    }

    /**
     * Generate a QR code for a given ticket.
     * The QR code encodes a simple string containing the ticket id and its status.
     */
    public String generateQRCode(Long ticketId) throws Exception {
        Optional<Ticket> optionalTicket = ticketRepository.findById(ticketId);
        if (!optionalTicket.isPresent()) {
            throw new RuntimeException("Ticket not found");
        }
        Ticket ticket = optionalTicket.get();
        String qrText = "TicketId:" + ticket.getId() + ";Status:" + ticket.getStatus();
        return QRCodeGenerator.generateQRCodeImage(qrText, 200, 200);
    }

    /**
     * Validate a scanned QR code.
     * For simplicity, this method expects a QR code text in the format "TicketId:<id>;Status:<status>"
     * and verifies that the ticket exists.
     */
    public boolean validateQRCode(String qrText) {
        if (qrText != null && qrText.startsWith("TicketId:")) {
            String[] parts = qrText.split(";");
            if (parts.length >= 1) {
                String ticketPart = parts[0];
                String[] ticketParts = ticketPart.split(":");
                if (ticketParts.length >= 2) {
                    try {
                        Long ticketId = Long.parseLong(ticketParts[1]);
                        return ticketRepository.existsById(ticketId);
                    } catch (NumberFormatException e) {
                        return false;
                    }
                }
            }
        }
        return false;
    }
}
