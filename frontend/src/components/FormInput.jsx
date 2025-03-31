// src/components/FormInput.jsx
import React from 'react';
import TextField from '@mui/material/TextField';

const FormInput = ({ name, label, type = 'text', value, onChange, error, ...props }) => {
  return (
    <TextField
      fullWidth
      margin="normal"
      variant="outlined"
      label={label}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      error={Boolean(error)}
      helperText={error}
      {...props}
    />
  );
};

export default FormInput;
