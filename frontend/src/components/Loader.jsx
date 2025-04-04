// src/components/Loader.jsx
import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loader = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
      <CircularProgress />
    </Box>
  );
};

export default Loader;
