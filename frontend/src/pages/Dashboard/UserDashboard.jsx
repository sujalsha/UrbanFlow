import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const UserDashboard = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Navbar />
      <Box sx={{ padding: '2rem', minHeight: '80vh' }}>
        <Typography variant="h4" sx={{ color: '#003366', mb: 2 }}>
          Welcome to Your Dashboard
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Access transit information, book tickets, check payment history, and manage your preferences.
        </Typography>
        <Box sx={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Button variant="contained" onClick={() => navigate('/transit')}>
            Transit Info
          </Button>
          <Button variant="contained" onClick={() => navigate('/route-planning')}>
            Route Planning
          </Button>
          <Button variant="contained" onClick={() => navigate('/ticketing')}>
            Ticketing
          </Button>
          <Button variant="contained" onClick={() => navigate('/payments')}>
            Payments
          </Button>
          <Button variant="contained" onClick={() => navigate('/preferences')}>
            Preferences & History
          </Button>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default UserDashboard;
