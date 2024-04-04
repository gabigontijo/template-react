import { useState } from 'react';
import PropTypes from 'prop-types';

import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { partnerById, deletePartner } from 'src/apis/partner';

import Iconify from 'src/components/iconify';

import { pixTypeMap } from '../common/constant';
import DialogDelete from '../common/dialog-delete';

// ----------------------------------------------------------------------

export default function PartnerTableRow({
  selected,
  id,
  name,
  cpf,
  phone,
  pixType,
  pixKey,
  email,
  address,
  handleClick,
  setPartnerId,
  setAlertError,
  setAlert,
  setNewPartner,
  setMessageAlert,
  setMessageError,
  setStatePartner,
  refetchPartners,
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
      const { Partner } = await partnerById(id);
      setNewPartner(true);
      setPartnerId(id);
      setStatePartner(Partner);
      setOpen(null);
    } catch (error) {
      console.log('Erro ao editar o parceiro:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deletePartner(id);
      setOpenDialog(false);
      setAlert(true);
      setMessageAlert('Parceiro deletado com sucesso')
      refetchPartners();
    } catch (error) {
      setOpenDialog(false);
      setAlertError(true);
      setMessageError('Erro ao deletar o parceiro')
      console.log('Erro ao Deletar o parceiro:', error);
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

        <TableCell>
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </TableCell>

        <TableCell>{email}</TableCell>

        <TableCell>{phone}</TableCell>

        <TableCell>{cpf}</TableCell>

        <TableCell>{pixTypeMap[pixType]}</TableCell>

        <TableCell>{pixKey}</TableCell>

        <TableCell>{address}</TableCell>

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
        message="parceiro"
      />
    </>
  );
}

PartnerTableRow.propTypes = {
  cpf: PropTypes.any,
  phone: PropTypes.any,
  handleClick: PropTypes.func,
  name: PropTypes.any,
  pixType: PropTypes.any,
  pixKey: PropTypes.any,
  address: PropTypes.any,
  email: PropTypes.any,
  selected: PropTypes.any,
  id: PropTypes.any,
  setPartnerId: PropTypes.func,
  setNewPartner: PropTypes.func,
  setAlertError: PropTypes.func,
  setAlert: PropTypes.func,
  setMessageAlert: PropTypes.func,
  setMessageError: PropTypes.func,
  setStatePartner: PropTypes.func,
  refetchPartners: PropTypes.func,
};
