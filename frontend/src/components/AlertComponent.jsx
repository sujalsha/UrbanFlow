// src/components/AlertComponent.jsx
import React from 'react';
import Alert from '@mui/material/Alert';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  alert: {
    margin: '1rem 0',
  },
}));

const AlertComponent = ({ severity = 'info', message }) => {
  const classes = useStyles();

  return (
    <Alert severity={severity} className={classes.alert}>
      {message}
    </Alert>
  );
};

export default AlertComponent;
