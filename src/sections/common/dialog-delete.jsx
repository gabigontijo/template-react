import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

export default function DialogDelete({ setOpen, open, handleDelete, name, message }) {
  const handleClose = () => {
    setOpen(false);
  };

  const getContentText = () => {
    if (typeof name === 'string') {
      return `Tem certeza que deseja deletar ${name} ?`;
    }

    if (Array.isArray(name)) {
      if (name.length === 1) {
        return `Tem certeza que deseja deletar ${name[0].name} ?`;
      }
      return `Tem certeza que deseja deletar ${name.length} ${message}s ?`;
    }
    return ''
  };

  return (
    <Dialog
      open={open}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-delete-description"
    >
      <DialogTitle>Deletar {message}?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-delete-description">
          {getContentText(name)}
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
  name: PropTypes.any,
  message: PropTypes.string,
};
