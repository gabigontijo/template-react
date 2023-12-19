import { useState } from 'react';
import PropTypes from 'prop-types';

import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import {loanById,  deleteLoan } from 'src/apis/loan';

import Iconify from 'src/components/iconify';

import DialogDelete from '../common/dialog-delete';

// ----------------------------------------------------------------------

export default function LoanTableRow({
  selected,
  id,
  client,
  value,
  banner,
  valueMachine,
  installments,
  grossProfit,
  partner,
  partnerProfit,
  netProfit,
  handleClick,
  setLoanId,
  setStateLoan,
  setAlertError,
  setAlert,
  setNewLoan,
  setMessageAlert,
  setMessageError,
}) {
  const [open, setOpen] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleEdit = async () => {
    try {
      const response = await loanById(id);
      setNewLoan(true);
      setStateLoan(response);
      setOpen(null);
      console.log(id);
    } catch (error) {
      // eslint-disable-next-line
      setNewLoan(true); //somente para ver o resultado depois remover
      setOpen(null);
      console.log('Erro ao editar o empréstimo:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await deleteLoan(id);
      console.log('Resposta da API:', response);
      setOpenDialog(false);
      setAlert(true);
      setMessageAlert('Empréstimo deletado com sucesso')
    } catch (error) {
      setOpenDialog(false);
      setAlertError(true);
      setMessageError('Erro ao deletar o empréstimo')
      console.log('Erro ao Deletar o empréstimo:', error);
    }
  };

  const handleDialog = () => {
    setOpenDialog(true);
    setOpen(null);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Typography variant="subtitle2" noWrap>
            {client}
          </Typography>
        </TableCell>

        <TableCell>{value}</TableCell>

        <TableCell>{banner}</TableCell>

        <TableCell>{valueMachine}</TableCell>

        <TableCell>{installments}</TableCell>

        <TableCell>{grossProfit}</TableCell>

        <TableCell>{partner}</TableCell>

        <TableCell>{partnerProfit}</TableCell>

        <TableCell>{netProfit}</TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={handleEdit} type="button">
        <IconButton sx={{ p: 0, '&:hover': { backgroundColor: 'transparent' } }}>
            <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
            <Typography variant="subtitle2" noWrap>
              Edit
            </Typography>
          </IconButton>
        </MenuItem>

        <MenuItem onClick={handleDialog}>
        <IconButton
            sx={{ p: 0, '&:hover': { backgroundColor: 'transparent' }, color: 'error.main' }}
          >
            <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
            <Typography variant="subtitle2" noWrap>
              Delete
            </Typography>
          </IconButton>
        </MenuItem>
      </Popover>
      <DialogDelete
        open={openDialog}
        setOpen={setOpenDialog}
        handleDelete={handleDelete}
        name='o empréstimo'
        message="empréstimo"
      />
    </>
  );
}

LoanTableRow.propTypes = {
  client: PropTypes.any,
  id: PropTypes.any,
  value: PropTypes.any,
  banner: PropTypes.any,
  valueMachine: PropTypes.any,
  installments: PropTypes.any,
  grossProfit: PropTypes.any,
  partner: PropTypes.any,
  partnerProfit: PropTypes.any,
  netProfit: PropTypes.any,
  selected: PropTypes.any,
  handleClick: PropTypes.func,
  setNewLoan: PropTypes.func,
  setStateLoan: PropTypes.func,
  setLoanId: PropTypes.func,
  setAlertError: PropTypes.func,
  setAlert: PropTypes.func,
  setMessageAlert: PropTypes.func,
  setMessageError: PropTypes.func,
};
