import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { clientById, deleteClient } from 'src/apis/client';

import Iconify from 'src/components/iconify';

import DialogDelete from '../common/dialog-delete';

// ----------------------------------------------------------------------

export default function ClientTableRow({
  selected,
  index,
  id,
  name,
  cpf,
  phone,
  pixType,
  pixKey,
  partner,
  documents,
  handleClick,
  setEditClient,
  setClientId,
  setStateClient,
  setAlert,
  setAlertError,
  setNewUser,
  setMessageAlert,
  setMessageError,
  refetchClients,
}) {
  const [open, setOpen] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
    console.log(event.target);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleEdit = async () => {
    try {
      // eslint-disable-next-line no-debugger
      debugger;
      const { Client } = await clientById(id);
      setEditClient(true);
      setNewUser(true);
      setClientId(id);
      setStateClient(Client);
      setOpen(null);
    } catch (error) {
      // eslint-disable-next-line
      console.log('Erro ao editar o cliente:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await deleteClient(id);
      console.log('Resposta da API:', response);
      setOpenDialog(false);
      setAlert(true);
      setMessageAlert('Cliente deletado com sucesso');
      refetchClients();
    } catch (error) {
      setOpenDialog(false);
      setAlertError(true);
      setMessageError('Erro ao Deletar o cliente');
      console.log('Erro ao Deletar o cliente:', error);
    }
  };

  const handleDialog = () => {
    setOpenDialog(true);
    setOpen(null);
  };

  const getCycledAvatarIndex = (avtIndex) => {
    const totalAvatarOptions = 24;
    return (avtIndex % totalAvatarOptions) + 1;
  };

  const currentAvatarIndex = getCycledAvatarIndex(index);

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={name} src={`/assets/images/avatars/avatar_${currentAvatarIndex}.jpg`} />
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{phone}</TableCell>

        <TableCell>{cpf}</TableCell>

        <TableCell>{pixType}</TableCell>

        <TableCell>{pixKey}</TableCell>

        <TableCell>{partner}</TableCell>

        <TableCell>{documents}</TableCell>

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
        name={name}
        message="cliente"
      />
    </>
  );
}

ClientTableRow.propTypes = {
  cpf: PropTypes.any,
  phone: PropTypes.any,
  handleClick: PropTypes.func,
  name: PropTypes.any,
  pixType: PropTypes.any,
  pixKey: PropTypes.any,
  partner: PropTypes.any,
  documents: PropTypes.any,
  selected: PropTypes.any,
  id: PropTypes.any,
  setEditClient: PropTypes.func,
  setClientId: PropTypes.func,
  setStateClient: PropTypes.func,
  setAlertError: PropTypes.func,
  setNewUser: PropTypes.func,
  setAlert: PropTypes.func,
  setMessageError: PropTypes.func,
  setMessageAlert: PropTypes.func,
  index: PropTypes.any,
  refetchClients: PropTypes.func,
};
