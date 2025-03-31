import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import FormInput from '../../components/FormInput';
import CustomButton from '../../components/CustomButton';
import userService from '../../services/userService';

const Preferences = () => {
  const [favoriteRoute, setFavoriteRoute] = useState('');
  const [userId, setUserId] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [history, setHistory] = useState([]);

  const handleFavoriteChange = (e) => {
    setFavoriteRoute(e.target.value);
  };

  const addFavoriteRoute = async () => {
    if (!userId || !favoriteRoute) {
      alert("User ID and Route ID are required");
      return;
    }
    try {
      await userService.addFavoriteRoute(userId, favoriteRoute);
      fetchFavorites();
    } catch (error) {
      console.error("Error adding favorite route:", error);
    }
  };

  const fetchFavorites = async () => {
    if (!userId) return;
    try {
      const favs = await userService.getFavoriteRoutes(userId);
      setFavorites(favs);
    } catch (error) {
      console.error("Error fetching favorite routes:", error);
    }
  };

  const fetchHistory = async () => {
    if (!userId) return;
    try {
      const hist = await userService.getUserHistory(userId);
      setHistory(hist);
    } catch (error) {
      console.error("Error fetching user history:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchFavorites();
      fetchHistory();
    }
  }, [userId]);

  return (
    <Box sx={{ padding: '2rem' }}>
      <Typography variant="h4" sx={{ color: '#003366', marginBottom: '1rem' }}>
        User Preferences & History
      </Typography>
      <Box sx={{ marginBottom: '2rem' }}>
        <FormInput
          name="userId"
          label="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </Box>
      <Box sx={{ marginBottom: '2rem' }}>
        <Typography variant="h6">Add Favorite Route</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormInput
              name="favoriteRoute"
              label="Route ID"
              value={favoriteRoute}
              onChange={handleFavoriteChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomButton onClick={addFavoriteRoute}>Add to Favorites</CustomButton>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ marginBottom: '2rem' }}>
        <Typography variant="h6">Favorite Routes</Typography>
        {favorites && favorites.length > 0 ? (
          <ul>
            {favorites.map((fav, index) => (
              <li key={index}>{fav}</li>
            ))}
          </ul>
        ) : (
          <Typography>No favorite routes found.</Typography>
        )}
      </Box>
      <Box>
        <Typography variant="h6">Travel History</Typography>
        {history && history.length > 0 ? (
          <ul>
            {history.map((record) => (
              <li key={record.id}>
                Route: {record.routeId} - {record.routeName} | Date: {new Date(record.traveledAt).toLocaleString()}
              </li>
            ))}
          </ul>
        ) : (
          <Typography>No travel history found.</Typography>
        )}
      </Box>
    </Box>
  );
};

export default Preferences;
