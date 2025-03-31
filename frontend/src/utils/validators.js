// Basic validators using regex.
// These can be integrated with form libraries like Formik/Yup.

export const isValidEmail = (email) => {
    // Simple email regex validation.
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  
  export const isValidPassword = (password) => {
    // Password must be at least 8 characters, contain at least one letter and one number.
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(password);
  };
  