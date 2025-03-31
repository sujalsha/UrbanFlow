import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Typography } from '@mui/material';
import FormInput from '../../components/FormInput';
import CustomButton from '../../components/CustomButton';
import ErrorAlert from '../../components/ErrorAlert';
import authService from '../../services/authService';

const Login = () => {
  const formik = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Password must contain letters and numbers')
        .required('Password is required'),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const token = await authService.login(values);
        console.log('Logged in, token:', token);
        // Redirect based on role
      } catch (error) {
        setErrors({ submit: error.response?.data || 'Login failed' });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Box sx={{ padding: '2rem' }}>
      <Typography variant="h4" sx={{ color: '#003366', mb: 2 }}>
        Login
      </Typography>
      {formik.errors.submit && <ErrorAlert message={formik.errors.submit} />}
      <form onSubmit={formik.handleSubmit}>
        <FormInput
          name="username"
          label="Username or Email"
          value={formik.values.username}
          onChange={formik.handleChange}
          error={formik.errors.username}
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
        <CustomButton type="submit" disabled={formik.isSubmitting}>
          Login
        </CustomButton>
      </form>
      <p>
        Don’t have an account? <Link to="/src/pages/Auth/Signup.jsx">Register</Link>
      </p>
    </Box>
  );
};

export default Login;
