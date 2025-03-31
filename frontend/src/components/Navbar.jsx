// src/components/Navbar.jsx
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  appBar: {
    backgroundColor: '#003366', // Midnight Blue
  },
  title: {
    flexGrow: 1,
    color: '#F4F4F4', // Soft White
  },
  navButton: {
    color: '#00AEEF', // Electric Cyan
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Citymapper Frontend
        </Typography>
        <Button className={classes.navButton} onClick={() => navigate('/')}>Login</Button>
        <Button className={classes.navButton} onClick={() => navigate('/signup')}>Signup</Button>
        <Button className={classes.navButton} onClick={() => navigate('/dashboard')}>Dashboard</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
