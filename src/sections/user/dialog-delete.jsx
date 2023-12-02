import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
// import Slide from '@mui/material/Slide';

export default function DialogDelete({ setOpen, open, handleDelete, name}) {

  const handleClose = () => {
    setOpen(false);
  };

  return (
        <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-delete-description"
      >
        <DialogTitle>Deletar cliente?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-delite-description">
            Tem certeza que deseja deletar {name} ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete}>Sim</Button>
          <Button onClick={handleClose}>Não</Button>
        </DialogActions>
      </Dialog>
  );
}


DialogDelete.propTypes = {
    setOpen: PropTypes.func,
    open: PropTypes.bool,
    handleDelete: PropTypes.func,
    name: PropTypes.string,
    
  };
  