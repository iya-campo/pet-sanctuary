import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'

export interface ConfirmationDialogProps {
  id: string;
  keepMounted: boolean;
  title?: string;
  message: string;
  open: boolean;
  onConfirm: () => Promise<void>
  onClose: () => void;
}

const ConfirmationDialog = ({ id, title, message, open, onConfirm, onClose, ...other }: ConfirmationDialogProps) => {

  const handleConfirm = () => {
    onConfirm();
    onClose();
  }

  const handleCancel = () => {
    onClose();
  };

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="xs"
      open={open}
      {...other}
    >
      {title ? <DialogTitle>{title}</DialogTitle> : null}
      <DialogContent>
        {message ? message : 'Are you sure you want to proceed?'}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleConfirm}>Ok</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmationDialog
