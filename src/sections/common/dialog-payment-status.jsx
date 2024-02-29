import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

export default function DialogPaymentStatus({ setOpen, open, handleStatus, name, status}) {

  const statusPayment = (status === 'paid'? "Pago": "Processando")


  const handleClose = () => {
    setOpen(false);
  };


  return (
    <Dialog
      open={open}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-status-description"
    >
      <DialogTitle>Alterar Status de Pagamento</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-status-description">
          Tem certeza que deseja alterar o status de pagamento do empréstimo do cliente: <b >{name} </b>para <span style={{ textTransform: 'uppercase', color: status ===  'paid'? '#00a76f' : '#fdda00' }}> {statusPayment} </span> 

        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleStatus}>Sim</Button>
        <Button onClick={handleClose}>Não</Button>
      </DialogActions>
    </Dialog>
  );
}

DialogPaymentStatus.propTypes = {
  setOpen: PropTypes.func,
  open: PropTypes.bool,
  handleStatus: PropTypes.func,
  name: PropTypes.any,
  status: PropTypes.any,
};
