// src/components/common/Button.jsx
import React from 'react';
import PropTypes from 'prop-types';
import '../../assets/styles/colors.css';


const Button = ({ children, onClick, type = 'button', variant = 'primary' }) => {
  return (
    <button className={`button ${variant}`} onClick={onClick} type={type}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
};

export default Button;
