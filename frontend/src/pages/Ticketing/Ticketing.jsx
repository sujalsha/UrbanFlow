import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import CustomButton from '../../components/CustomButton';
import CardComponent from '../../components/CardComponent';
import Loader from '../../components/Loader';
import ErrorAlert from '../../components/ErrorAlert';
import ticketService from '../../services/ticketService';

const Ticketing = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const userId = localStorage.getItem('userId') || 1; // Assuming user ID stored in localStorage

  const fetchTickets = async () => {
    setError('');
    setLoading(true);
    try {
      const data = await ticketService.getMyTickets(userId);
      setTickets(data);
    } catch (err) {
      console.error('Error fetching tickets:', err);
      setError('Failed to fetch tickets');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (ticketId) => {
    setError('');
    try {
      await ticketService.cancelTicket(ticketId);
      fetchTickets();
    } catch (err) {
      console.error('Error canceling ticket:', err);
      setError('Failed to cancel ticket');
    }
  };

  const handleGenerateQR = async (ticketId) => {
    setError('');
    try {
      const qrCode = await ticketService.generateQRCode(ticketId);
      alert(`QR Code (Base64): ${qrCode}`);
    } catch (err) {
      console.error('Error generating QR code:', err);
      setError('Failed to generate QR code');
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <Box sx={{ padding: '2rem' }}>
      <Typography variant="h4" sx={{ color: '#003366', mb: 2 }}>
        My Tickets
      </Typography>
      {error && <ErrorAlert message={error} />}
      {loading ? (
        <Loader />
      ) : (
        <Grid container spacing={2}>
          {tickets.length > 0 ? (
            tickets.map((ticket) => (
              <Grid item xs={12} sm={6} md={4} key={ticket.id}>
                <CardComponent title={`Ticket ${ticket.id}`}>
                  <Typography>Route: {ticket.routeName} ({ticket.routeId})</Typography>
                  <Typography>Status: {ticket.status}</Typography>
                  <Box sx={{ mt: 1 }}>
                    <CustomButton onClick={() => handleCancel(ticket.id)}>
                      Cancel Ticket
                    </CustomButton>
                    <CustomButton onClick={() => handleGenerateQR(ticket.id)} sx={{ ml: 1 }}>
                      Generate QR
                    </CustomButton>
                  </Box>
                </CardComponent>
              </Grid>
            ))
          ) : (
            <Typography>No tickets booked.</Typography>
          )}
        </Grid>
      )}
    </Box>
  );
};

export default Ticketing;
