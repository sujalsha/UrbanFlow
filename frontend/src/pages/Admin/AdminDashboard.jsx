import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';
import Sidebar from '../../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import ErrorAlert from '../../components/ErrorAlert';

const menuItems = [
  { label: 'Manage Routes', path: '/admin/manage-routes' },
  { label: 'Manage Stops', path: '/admin/manage-stops' },
  { label: 'System Status', path: '/system-status' },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [systemStatus, setSystemStatus] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/system/status');
        const data = await res.json();
        setSystemStatus(data);
      } catch (err) {
        console.error('Error fetching system status:', err);
        setError('Failed to fetch system status');
      }
    };
    fetchStatus();
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar menuItems={menuItems} />
      <Box sx={{ flexGrow: 1, padding: '2rem' }}>
        <Typography variant="h4" sx={{ color: '#003366', mb: 2 }}>
          Admin Dashboard
        </Typography>
        {error && <ErrorAlert message={error} />}
        {systemStatus && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6">System Status</Typography>
            <Typography>Status: {systemStatus.server}</Typography>
            <Typography>Active Sessions: {systemStatus.activeSessions}</Typography>
            <Typography>Uptime: {systemStatus.uptime}</Typography>
          </Box>
        )}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Button variant="contained" onClick={() => navigate('/admin/addRoute')}>
              Add New Route
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button variant="contained" onClick={() => navigate('/admin/addStop')}>
              Add New Stop
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
