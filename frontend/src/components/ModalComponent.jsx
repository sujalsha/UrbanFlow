// src/components/ModalComponent.jsx
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  dialogTitle: {
    backgroundColor: 'var(--primary-midnight-blue)',
    color: 'var(--accent-soft-white)',
  },
  dialogActions: {
    padding: '1rem',
  },
}));

const ModalComponent = ({ open, onClose, title, children, onConfirm, confirmText = 'Confirm' }) => {
  const classes = useStyles();

  return (
    <Dialog open={open} onClose={onClose}>
      {title && <DialogTitle className={classes.dialogTitle}>{title}</DialogTitle>}
      <DialogContent>{children}</DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button onClick={onClose} style={{ color: 'var(--primary-electric-cyan)' }}>
          Cancel
        </Button>
        <Button onClick={onConfirm} style={{ backgroundColor: 'var(--primary-electric-cyan)', color: '#fff' }}>
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalComponent;
