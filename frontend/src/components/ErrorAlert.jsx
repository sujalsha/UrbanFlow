// src/components/ErrorAlert.jsx
import React from 'react';
import Alert from '@mui/material/Alert';

const ErrorAlert = ({ message }) => {
  return (
    <Alert severity="error" sx={{ margin: '1rem 0' }}>
      {message}
    </Alert>
  );
};

export default ErrorAlert;
