import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';
import transitService from '../../services/transitService';
import CardComponent from '../../components/CardComponent';
import CustomButton from '../../components/CustomButton';
import FormInput from '../../components/FormInput';
import Loader from '../../components/Loader';
import ErrorAlert from '../../components/ErrorAlert';

const TransitInfo = () => {
  const [modes, setModes] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [selectedRouteId, setSelectedRouteId] = useState('');
  const [stops, setStops] = useState([]);
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch transit modes
  useEffect(() => {
    const fetchModes = async () => {
      try {
        const data = await transitService.getModes();
        setModes(data);
      } catch (err) {
        setError('Failed to fetch transit modes');
      }
    };
    fetchModes();
  }, []);

  // Fetch routes
  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const data = await transitService.getRoutes();
        setRoutes(data);
      } catch (err) {
        setError('Failed to fetch routes');
      }
    };
    fetchRoutes();
  }, []);

  const handleRouteSelection = async (routeId) => {
    setSelectedRouteId(routeId);
    setSchedule(null);
    try {
      const stopsData = await transitService.getStops(routeId);
      setStops(stopsData);
    } catch (err) {
      setError('Failed to fetch stops');
    }
  };

  const handleGetSchedule = async (stopId) => {
    try {
      const scheduleData = await transitService.getSchedule(stopId);
      setSchedule(scheduleData);
    } catch (err) {
      setError('Failed to fetch schedule');
    }
  };

  return (
    <Box sx={{ padding: '2rem' }}>
      <Typography variant="h4" sx={{ color: '#003366', mb: 2 }}>
        Transit Information
      </Typography>
      {error && <ErrorAlert message={error} />}
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6">Available Transit Modes</Typography>
        <Box sx={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', my: 1 }}>
          {modes.map((mode, idx) => (
            <Button key={idx} variant="outlined" sx={{ borderColor: 'var(--primary-electric-cyan)', color: 'var(--primary-electric-cyan)' }}>
              {mode}
            </Button>
          ))}
        </Box>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6">Transit Routes</Typography>
        {routes.length > 0 ? (
          <Grid container spacing={2}>
            {routes.map((route) => (
              <Grid item xs={12} sm={6} md={4} key={route.id}>
                <CardComponent title={route.name}>
                  <Typography>Mode: {route.mode}</Typography>
                  <Button onClick={() => handleRouteSelection(route.id)} variant="contained" sx={{ mt: 1 }}>
                    View Stops
                  </Button>
                </CardComponent>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography>No routes available.</Typography>
        )}
      </Box>
      {selectedRouteId && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6">Stops for Route: {selectedRouteId}</Typography>
          {stops.length > 0 ? (
            <Grid container spacing={2}>
              {stops.map((stop) => (
                <Grid item xs={12} sm={6} md={4} key={stop.id}>
                  <CardComponent title={stop.name}>
                    <Typography>Lat: {stop.latitude}</Typography>
                    <Typography>Lon: {stop.longitude}</Typography>
                    <CustomButton onClick={() => handleGetSchedule(stop.id)} type="button" sx={{ mt: 1 }}>
                      Get Schedule
                    </CustomButton>
                  </CardComponent>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography>No stops available for this route.</Typography>
          )}
        </Box>
      )}
      {schedule && (
        <Box>
          <Typography variant="h6">Schedule for Stop: {schedule.stopId}</Typography>
          {schedule.departureTimes && schedule.departureTimes.length > 0 ? (
            <ul>
              {schedule.departureTimes.map((time, index) => (
                <li key={index}>{time}</li>
              ))}
            </ul>
          ) : (
            <Typography>No schedule available.</Typography>
          )}
        </Box>
      )}
      {loading && <Loader />}
    </Box>
  );
};

export default TransitInfo;
