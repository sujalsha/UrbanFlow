// src/components/CardComponent.jsx
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  card: {
    margin: '1rem',
    border: `1px solid var(--accent-charcoal-grey)`,
  },
  header: {
    backgroundColor: 'var(--primary-midnight-blue)',
    color: 'var(--accent-soft-white)',
  },
}));

const CardComponent = ({ title, children }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      {title && <CardHeader title={title} className={classes.header} />}
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

export default CardComponent;
