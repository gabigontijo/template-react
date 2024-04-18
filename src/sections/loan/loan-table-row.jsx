import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
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

import { formatarData } from 'src/utils/format-time';

import { loanById, deleteLoan, updateLoanPaymentStatus } from 'src/apis/loan';

import Iconify from 'src/components/iconify';

import CardIcon from '../common/card-brand-icon';
import DialogDelete from '../common/dialog-delete';
import DialogPaymentStatus from '../common/dialog-payment-status';
// ----------------------------------------------------------------------

export default function LoanTableRow({
  selected,
  id,
  client,
  value,
  dateCreated,
  dateUpdated,
  cards,
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
  paymentStatus,
  refetchLoans,
}) {
  const [open, setOpen] = useState(null);

  const [openStatus, setOpenStatus] = useState(null);

  const [textStatus, setTextStatus] = useState(paymentStatus);

  const [statusPayment, setStatusPayment] = useState('');

  const [openDialog, setOpenDialog] = useState(false);

  const [openDialogStatus, setOpenDialogStatus] = useState(false);

  const [openCard, setOpenCard] = useState(false);


  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleOpenStatus = (event) => {
    setOpenStatus(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);

  }; 
  
  const handleCloseStatus = () => {
    setOpenStatus(null);
  };

  const handleEdit = async () => {
    try {
      console.log(id);
      console.log("typeof", typeof id);
      const response = await loanById(id);
      console.log('response', response);
      setLoanId(id);
      setNewLoan(true);
      setStateLoan(response.Loan);
      setOpen(null);
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

  const handleDialogStatus = (status) => {
    console.log("entrei aqui")
    setOpenDialogStatus(true);
    setOpenStatus(null);
    setStatusPayment(status);
  };

  const handleStatus = async () => {
    const bodyEditPaymentStatus = { paymentStatus: statusPayment}
    try {
      const response = await updateLoanPaymentStatus(id, bodyEditPaymentStatus);
      console.log('Resposta da API loan:', response);
      setOpenDialogStatus(false);
      setAlert(true);
      setMessageAlert('Status do pagamento atualizado com sucesso')
      setTextStatus(statusPayment === "paid"? "paid": "pending")
      refetchLoans();
    } catch (error) {
      setOpenDialogStatus(false);
      setAlertError(true);
      setMessageError('Erro ao atualizar o status do pagamento')
      console.log('Erro  ao atualizar o status do pagamento:', error);
    }
    setOpenStatus(null);
  };

  const createDate = formatarData(dateCreated);
  const updateDate = formatarData(dateUpdated);

  const formatValue = (vl) => {
    if (vl === null) {
      return null; 
    }
    return `R$ ${vl.toFixed(2)}`; 
  }

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpenCard(!openCard)}
          >
            {openCard ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell component="th" scope="row">
          <Typography variant="subtitle2" noWrap>
            {client.name}
          </Typography>
        </TableCell>

        <TableCell>{formatValue(value)}</TableCell>

        <TableCell>{formatValue(grossProfit)}</TableCell>

        <TableCell>{partner.name}</TableCell>

        <TableCell>{formatValue(partnerProfit)}</TableCell>

        <TableCell>{formatValue(netProfit)}</TableCell>

        <TableCell align="center">
          <IconButton onClick={handleOpenStatus} sx={{ p: 0, '&:hover': { backgroundColor: 'transparent' } }}>
            {textStatus === 'paid' ? <Iconify icon="el:ok-circle" sx={{ color: '#00a76f' }} /> : 
            <Iconify icon="zondicons:timer"  sx={{ color: '#fdda00'}}/>}
            <Typography variant='caption' display='none' >
              {textStatus}
            </Typography>
          </IconButton>
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={openCard} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Dados do pagamento
              </Typography>
              <Typography variant="h8" gutterBottom component="div">
                Criado: {createDate}
              </Typography>
              <Typography variant="h8" gutterBottom component="div">
              Última modificação: {updateDate}
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Cartão </TableCell>
                    <TableCell align="right">Bandeira</TableCell>
                    <TableCell align="right">Valor (R$)</TableCell>
                    <TableCell align="right">Parcelas</TableCell>
                    <TableCell align="right">Valor da Parcela</TableCell>
                    <TableCell align="right">Tipo do pagamento</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cards.map((card) => (
                    <TableRow key={card.id}>
                      <TableCell component="th" scope="row" style={{ whiteSpace: 'nowrap' }}>
                        {card.cardMachineName}
                      </TableCell>
                      <TableCell align="right">
                        <CardIcon brandIcon={card.brand} size={20}/></TableCell>
                      <TableCell align="right" style={{ whiteSpace: 'nowrap' }}>{formatValue(card.value)}</TableCell>
                      <TableCell align="right">
                        {card.installments}
                      </TableCell>
                      <TableCell align="right"  style={{ whiteSpace: 'nowrap' }}>
                        {formatValue(card.installmentsValue)}
                      </TableCell>
                       <TableCell align="right">
                        {card.paymentType === "presentialTax" ? 'Presencial': 'Online'}
                      </TableCell>
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
        name='o empréstimo'
        message="empréstimo"
      />
      <Popover
        open={!!openStatus}
        anchorEl={openStatus}
        onClose={handleCloseStatus}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >
        <MenuItem onClick={() => handleDialogStatus('paid')} type="button">
          <IconButton sx={{ p: 0, '&:hover': { backgroundColor: 'transparent' } }}>
            <Typography variant="subtitle2" noWrap>
              Pago
            </Typography>
          </IconButton>
        </MenuItem>

        <MenuItem onClick={() => handleDialogStatus('pending')}>
          <IconButton
            sx={{ p: 0, '&:hover': { backgroundColor: 'transparent' } }}
          >
            <Typography variant="subtitle2" noWrap>
              Processando
            </Typography>
          </IconButton>
        </MenuItem>
      </Popover>
      <DialogPaymentStatus handleStatus={handleStatus} name={client.name} open={openDialogStatus} setOpen={setOpenDialogStatus} status={statusPayment}/>
    </>
  );
}

LoanTableRow.propTypes = {
  client: PropTypes.any,
  id: PropTypes.any,
  value: PropTypes.any,
  dateCreated: PropTypes.any,
  dateUpdated: PropTypes.any,
  grossProfit: PropTypes.any,
  partner: PropTypes.any,
  cards: PropTypes.any,
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
  paymentStatus: PropTypes.any,
  refetchLoans: PropTypes.func,
};
