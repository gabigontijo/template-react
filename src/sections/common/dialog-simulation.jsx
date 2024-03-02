import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

export default function DialogSimulation({ setOpen, open, message}) {

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <Dialog
      open={open}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-simulation"
    >
      <DialogTitle>Erro para simular</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-status-description">
          {message}

        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>OK</Button>
      </DialogActions>
    </Dialog>
  );
}

DialogSimulation.propTypes = {
  setOpen: PropTypes.func,
  open: PropTypes.bool,
  message: PropTypes.string,
};
