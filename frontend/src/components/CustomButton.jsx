// src/components/CustomButton.jsx
import React from 'react';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: '#00AEEF', // Electric Cyan
    color: '#F4F4F4', // Soft White
    '&:hover': {
      backgroundColor: '#003366', // Midnight Blue on hover
    },
  },
}));

const CustomButton = ({ children, onClick, type, ...props }) => {
  const classes = useStyles();
  return (
    <Button
      variant="contained"
      className={classes.root}
      onClick={onClick}
      type={type}
      {...props}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
