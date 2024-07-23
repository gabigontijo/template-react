import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Collapse from '@mui/material/Collapse';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { useAuth } from 'src/hooks/authProvider';

import { formatarData } from 'src/utils/format-time';
import { handleApiError } from 'src/utils/error-handle';

import { cardMachineById, deleteCardMachine } from 'src/apis/card-machine';

import Iconify from 'src/components/iconify';

import CardIcon from '../common/card-brand-icon';
import DialogDelete from '../common/dialog-delete';

// ----------------------------------------------------------------------

export default function MachineTableRow({
  selected,
  id,
  name,
  brand,
  presentialTax,
  onlineTax,
  installments,
  handleClick,
  setMachineId,
  setStateMachine,
  setAlert,
  setAlertError,
  setNewMachine,
  setMessageAlert,
  setMessageError,
  refetchMachines,
  createDate,
  updateDate,
}) {
  const [open, setOpen] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);

  const [openCard, setOpenCard] = useState(false);

  const auth = useAuth();

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const populationState = (response) => ({
    brand: JSON.parse(response.brand),
    name: response.name,
    presentialTax: response.presentialTax,
    onlineTax: response.onlineTax,
    installments: response.installments,
  })

  const handleEdit = async () => {
    try {
      const { CardMachine } = await cardMachineById(id);
      setNewMachine(true);
      setMachineId(id);
      const bodyState = populationState(CardMachine);
      console.log('bodyMahine', bodyState)
      // eslint-disable-next-line no-debugger
    debugger
      setStateMachine(bodyState);
      setOpen(null);
    } catch (error) {
      console.log('Erro ao editar o maquininha:', error);
      handleApiError(error, auth);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteCardMachine(id);
      setOpenDialog(false);
      setAlert(true);
      setMessageAlert('Maquininha deletada com sucesso');
      refetchMachines();
    } catch (error) {
      setOpenDialog(false);
      setAlertError(true);
      setMessageError('Erro ao Deletar a maquininha');
      console.log('Erro ao Deletar a maquininha:', error);
      handleApiError(error, auth);
    }
  };

  const handleDialog = () => {
    setOpenDialog(true);
    setOpen(null);
  };

  const parseBrand = (brandString) => {
    let parsedArray = [];
    try {
        if (typeof brandString === "string" && brandString.trim() !== "") {
            const parsed = JSON.parse(brandString);
            if (Array.isArray(parsed)) {
                parsedArray = parsed;
            } else {
                console.error("Parsed JSON is not an array:", parsed);
            }
        }
    } catch (error) {
        console.error("Error parsing JSON:", error, "Input:", brandString);
    }
    return parsedArray;
}


  const dateCreated = formatarData(updateDate);
  const dateUpdated = formatarData(createDate);
  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected} key={`${id}subtable-machines`}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </TableCell>

        <TableCell>
          <Stack
            spacing={{ xs: 1, sm: 2 }}
            direction="row"
            useFlexGap
            sx={{
              flexWrap: {
                xs: 'wrap',
                sm: 'nowrap',
              },
            }}
          >
            {parseBrand(brand).map((b, index) => (
              <CardIcon key={`${index}${b}`} brandIcon={b} size={40} />
            ))}
          </Stack>
        </TableCell>
        <TableCell>{installments}</TableCell>
        <TableCell>{presentialTax[installments]}</TableCell>
        <TableCell>{onlineTax[installments]}</TableCell>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpenCard(!openCard)}>
            {openCard ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow key={`${id}sub-table-machine`}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={openCard} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Dados do pagamento
              </Typography>
              <Typography variant="h8" gutterBottom component="div">
                Criado: {dateCreated}
              </Typography>
              <Typography variant="h8" gutterBottom component="div">
                Última modificação: {dateUpdated}
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow  key={`${id}sub-titles-table-machine`}>
                    <TableCell>Parcela</TableCell>
                    <TableCell align="right">Taxa Presencial(%)</TableCell>
                    <TableCell align="right">Taxa Online(%)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.keys(presentialTax)?.map((tax, index) => (
                    <TableRow key={`${name}_${index}`}>
                      <TableCell component="th" scope="row" style={{ whiteSpace: 'nowrap' }}>
                        {tax}
                      </TableCell>
                      <TableCell align="right">{presentialTax[tax]}</TableCell>
                      <TableCell align="right">{onlineTax[tax]}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
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
        message="Maquininha"
      />
    </>
  );
}

MachineTableRow.propTypes = {
  handleClick: PropTypes.func,
  name: PropTypes.any,
  presentialTax: PropTypes.any,
  onlineTax: PropTypes.any,
  brand: PropTypes.any,
  installments: PropTypes.any,
  selected: PropTypes.any,
  createDate: PropTypes.any,
  updateDate: PropTypes.any,
  id: PropTypes.any,
  setMachineId: PropTypes.func,
  setStateMachine: PropTypes.func,
  setAlertError: PropTypes.func,
  setNewMachine: PropTypes.func,
  setAlert: PropTypes.func,
  setMessageError: PropTypes.func,
  setMessageAlert: PropTypes.func,
  refetchMachines: PropTypes.func,
};
