import React, { useState } from 'react';
import './ConfirmationDialog.css';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';

const ConfirmationDialog = (props) => {
  const { open, setOpen, onConfirm, warning, title } = props;
  // const [open, setOpen] = useState(openDialog);
  return (<>
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle sx={{ color: warning ? 'red' : 'black' }}>{title}</DialogTitle>
      <DialogActions>
        <Button variant='outlined' onClick={() => {onConfirm(); setOpen(false)}}>CONFIRM</Button>
        <Button variant='contained' onClick={() => setOpen(false)}>CLOSE</Button>
      </DialogActions>
    </Dialog>
  </>);
};

export default ConfirmationDialog;