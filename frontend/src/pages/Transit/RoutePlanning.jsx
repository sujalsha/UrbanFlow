import React, { useState } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import FormInput from '../../components/FormInput';
import CustomButton from '../../components/CustomButton';
import ErrorAlert from '../../components/ErrorAlert';
import routeService from '../../services/routeService';

const RoutePlanning = () => {
  const [origin, setOrigin] = useState({ lat: '', lon: '' });
  const [destination, setDestination] = useState({ lat: '', lon: '' });
  const [routePlan, setRoutePlan] = useState(null);
  const [error, setError] = useState('');

  const handleFindRoute = async () => {
    setError('');
    try {
      const data = await routeService.findBestRoute(origin.lat, origin.lon, destination.lat, destination.lon);
      setRoutePlan(data);
    } catch (err) {
      console.error('Error finding best route:', err);
      setError('Failed to find best route');
    }
  };

  const handleFindMultiModalRoute = async () => {
    setError('');
    try {
      const data = await routeService.getMultiModalRoute(origin.lat, origin.lon, destination.lat, destination.lon);
      setRoutePlan(data);
    } catch (err) {
      console.error('Error finding multi-modal route:', err);
      setError('Failed to find multi-modal route');
    }
  };

  return (
    <Box sx={{ padding: '2rem' }}>
      <Typography variant="h4" sx={{ color: '#003366', mb: 2 }}>
        Route Planning
      </Typography>
      {error && <ErrorAlert message={error} />}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Origin</Typography>
          <FormInput
            name="originLat"
            label="Latitude"
            value={origin.lat}
            onChange={(e) => setOrigin({ ...origin, lat: e.target.value })}
          />
          <FormInput
            name="originLon"
            label="Longitude"
            value={origin.lon}
            onChange={(e) => setOrigin({ ...origin, lon: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6">Destination</Typography>
          <FormInput
            name="destLat"
            label="Latitude"
            value={destination.lat}
            onChange={(e) => setDestination({ ...destination, lat: e.target.value })}
          />
          <FormInput
            name="destLon"
            label="Longitude"
            value={destination.lon}
            onChange={(e) => setDestination({ ...destination, lon: e.target.value })}
          />
        </Grid>
      </Grid>
      <Box sx={{ mt: 2 }}>
        <CustomButton onClick={handleFindRoute}>
          Find Best Route
        </CustomButton>
        <CustomButton onClick={handleFindMultiModalRoute} sx={{ ml: 2 }}>
          Find Multi-Modal Route
        </CustomButton>
      </Box>
      {routePlan && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">Route Plan</Typography>
          <Typography>Distance: {routePlan.distance} meters</Typography>
          <Typography>Time: {routePlan.time} seconds</Typography>
          <Typography>Polyline: {routePlan.polyline}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default RoutePlanning;
