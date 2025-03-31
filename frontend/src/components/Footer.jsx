// src/components/Footer.jsx
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  footer: {
    backgroundColor: '#333333', // Charcoal Grey
    color: '#F4F4F4', // Soft White
    textAlign: 'center',
    padding: '1rem',
    position: 'fixed',
    bottom: 0,
    width: '100%',
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <Box className={classes.footer}>
      <Typography variant="body2">
        &copy; {new Date().getFullYear()} Citymapper. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
