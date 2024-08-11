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

import { useAuth } from 'src/hooks/authProvider';

import { handleApiError } from 'src/utils/error-handle';

import { clientById, deleteClient } from 'src/apis/client';

import Iconify from 'src/components/iconify';

import { pixTypeMap } from '../common/constant';
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
  setClientId,
  setStateClient,
  setAlert,
  setAlertError,
  setNewUser,
  setMessage,
  refetchClients,
  setClientDocuments,
}) {
  const [open, setOpen] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);

  const auth = useAuth();

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleEdit = async () => {
    try {
      const { Client } = await clientById(id);
      const arrDocuments = Client.documents.split(",");
      Client.documents = arrDocuments;
      setClientDocuments(arrDocuments);
      setNewUser(true);
      setClientId(id);
      setStateClient(Client);
      setOpen(null);
    } catch (error) {
      handleApiError(error, auth);
      setAlertError(true);
      setMessage('Erro ao editar o cliente');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteClient(id);
      setOpenDialog(false);
      setAlert(true);
      setMessage('Cliente deletado com sucesso');
      refetchClients();
    } catch (error) {
      handleApiError(error, auth);
      setOpenDialog(false);
      setAlertError(true);
      setMessage('Erro ao Deletar o cliente');
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

        <TableCell>{pixTypeMap[pixType]}</TableCell>

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
              Editar
            </Typography>
          </IconButton>
        </MenuItem>

        <MenuItem onClick={handleDialog}>
          <IconButton
            sx={{ p: 0, '&:hover': { backgroundColor: 'transparent' }, color: 'error.main' }}
          >
            <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
            <Typography variant="subtitle2" noWrap>
              Deletar
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
  setClientId: PropTypes.func,
  setStateClient: PropTypes.func,
  setAlertError: PropTypes.func,
  setNewUser: PropTypes.func,
  setAlert: PropTypes.func,
  setMessage: PropTypes.func,
  index: PropTypes.any,
  refetchClients: PropTypes.func,
  setClientDocuments: PropTypes.func,
};
