import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';

const EmployeeDashboard = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Navbar />
      <Box sx={{ padding: '2rem', minHeight: '80vh' }}>
        <Typography variant="h4" sx={{ color: '#003366', mb: 2 }}>
          Employee Dashboard
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Welcome, Employee. View transit information and real-time updates.
        </Typography>
        <Button variant="contained" onClick={() => navigate('/transit')}>
          View Transit Info
        </Button>
      </Box>
      <Footer />
    </Box>
  );
};

export default EmployeeDashboard;
