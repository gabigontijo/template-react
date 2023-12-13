import { useState } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { loans } from 'src/_mock/loan';
import { deleteLoan } from 'src/apis/loan';
import AlertNotifications from 'src/layouts/dashboard/common/alert-notifications';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import FormNewLoan from '../form-new-loan';
import LoanTableRow from '../loan-table-row';
import TableNoData from '../../common/table-no-data';
import ComoonTableHead from '../../common/table-head';
import TableToolbar from '../../common/table-toolbar';
import TableEmptyRows from '../../common/table-empty-rows';
import { emptyRows, applyFilter, getComparator } from '../../utils';
import { loanInterface } from './type';

// ----------------------------------------------------------------------

export default function LoanPage() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [newLoan, setNewLoan] = useState(false);

  const [alert, setAlert] = useState(false);

  const [alertError, setAlertError] = useState(false);

  const [messageError, setMessageError] = useState('');

  const [messageAlert, setMessageAlert] = useState('');

  const [editLoan, setEditLoan] = useState(false);

  const [loanId, setLoanId] = useState('');

  const [loanToEdit, setLoanToEdit] = useState();

  const [loan, setLoan] = useState(loanToEdit || loanInterface);

  const [openDialog, setOpenDialog] = useState(false);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = loans.map((n) => ({
        name: n.client,
        id: n.id,
      }));
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name, id) => {
    const selectedIndex = selected.findIndex((item) => item.name === name);

    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = [...selected, { name, id }];
    } else {
      newSelected = selected.filter((item) => item.name !== name);
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleAddUser = () => {
    setNewLoan(true);
  };

  const handleCloseAdd = () => {
    setNewLoan(false);
  };

  const dataFiltered = applyFilter({
    inputData: loans,
    comparator: getComparator(order, orderBy),
    filterName,
    field: 'client',
  });

  const handleDelete = async () => {
    try {
      const results = await Promise.all(
        selected.map(async (l) => {
          const result = await deleteLoan(l.id);
          return result;
        })
      );
      console.log(results);
      setAlert(true);
      setMessageAlert('Empréstimo excluído com sucesso')
      setOpenDialog(false);
      setSelected([]);
    } catch (error) {
      console.error('Erro ao excluir empréstimos:', error);
      setAlertError(true);
      setMessageError('Erro ao excluir empréstimos')
      setOpenDialog(false);
      setSelected([]);


    }
  };

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Empréstimos</Typography>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
          spacing={2}
        >
          {!newLoan && (
            <Button
              variant="contained"
              color="inherit"
              startIcon={<Iconify icon="eva:plus-fill" />}
              onClick={handleAddUser}
            >
              Novo Empréstimo
            </Button>
          )}
          {(newLoan || editLoan) && (
            <Button color="inherit" onClick={handleCloseAdd}>
              <CloseIcon />
            </Button>
          )}
        </Stack>
      </Stack>
      {(newLoan || editLoan) && (
        <FormNewLoan
          filterName={filterName}
          onFilterName={handleFilterByName}
          setAlert={setAlert}
          setAlertError={setAlertError}
          setMessageAlert={setMessageAlert}
          setMessageError={setMessageError}
          setLoan= {setLoan}
          loan={loan}
      
        />
      )}

      {alert && (
        <AlertNotifications
          alert={alert}
          setAlert={setAlert}
          message={messageAlert}
        />
      )}
      {alertError && (
        <AlertNotifications
          alertError={alertError}
          setAlertError={setAlertError}
          message={messageError}
        />
      )}
      <Card>
        <TableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
          placeholder="Procurar empréstimo..."
          handleDelete={handleDelete}
          selected={selected}
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          message='empréstimo'
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <ComoonTableHead
                order={order}
                orderBy={orderBy}
                rowCount={loans.length}
                onRequestSort={handleSort}
                numSelected={selected.length}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'client', label: 'Cliente' },
                  { id: 'value', label: 'Valor Solicitado' },
                  { id: 'banner', label: 'Bandeira' },
                  { id: 'valueMachine', label: 'Valor Máquina' },
                  { id: 'installments', label: 'Parcelas' },
                  { id: 'grossProfit', label: 'Lucro Bruto' },
                  { id: 'partner', label: 'Parceiro' },
                  { id: 'partnerProfit', label: 'Lucro Parceiro' },
                  { id: 'netProfit', label: 'Lucro Líquido' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <LoanTableRow
                      key={row.id}
                      client={row.client}
                      value={row.value}
                      banner={row.banner}
                      valueMachine={row.valueMachine}
                      installments={row.installments}
                      grossProfit={row.grossProfit}
                      partner={row.partner}
                      partnerProfit={row.partnerProfit}
                      netProfit={row.netProfit}
                      selected={selected.some((item) => item.name === row.client)}
                      handleClick={(event) => handleClick(event, row.client, row.id)}
                      setEditLoan={setEditLoan}
                      setLoanToEdit={setLoanToEdit}
                      setNewLoan={setNewLoan}
                      setAlert={setAlert}
                      setAlertError={setAlertError}
                      setMessageAlert={setMessageAlert}
                      setMessageError={setMessageError}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, loans.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={loans.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
