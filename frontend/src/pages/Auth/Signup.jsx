import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Typography } from '@mui/material';
import FormInput from '../../components/FormInput';
import CustomButton from '../../components/CustomButton';
import ErrorAlert from '../../components/ErrorAlert';
import authService from '../../services/authService';

const Signup = () => {
  const formik = useFormik({
    initialValues: { username: '', email: '', password: '', role: 'USER' },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Password must contain letters and numbers')
        .required('Password is required'),
      role: Yup.string()
        .oneOf(['USER', 'ADMIN', 'DRIVER', 'CONDUCTOR'], 'Invalid role')
        .required('Role is required'),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const result = await authService.signup(values);
        console.log('Signup successful:', result);
        // Optionally, redirect to login page
      } catch (error) {
        setErrors({ submit: error.response?.data || 'Signup failed' });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Box sx={{ padding: '2rem' }}>
      <Typography variant="h4" sx={{ color: '#003366', mb: 2 }}>
        Signup
      </Typography>
      {formik.errors.submit && <ErrorAlert message={formik.errors.submit} />}
      <form onSubmit={formik.handleSubmit}>
        <FormInput
          name="username"
          label="Username"
          value={formik.values.username}
          onChange={formik.handleChange}
          error={formik.errors.username}
        />
        <FormInput
          name="email"
          label="Email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.errors.email}
        />
        <FormInput
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.errors.password}
          pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
          title="Password must be at least 8 characters and contain letters and numbers"
          required
        />
        <FormInput
          name="role"
          label="Role (USER, ADMIN, DRIVER, CONDUCTOR)"
          value={formik.values.role}
          onChange={formik.handleChange}
          error={formik.errors.role}
        />
        <CustomButton type="submit" disabled={formik.isSubmitting}>
          Signup
        </CustomButton>
      </form>
    </Box>
  );
};

export default Signup;
