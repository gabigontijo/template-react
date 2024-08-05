import { useState } from 'react';
import { useQuery } from "react-query";

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
import CircularProgress from '@mui/material/CircularProgress';

// import { loans } from 'src/_mock/loan';
import { useAuth } from 'src/hooks/authProvider';

import { handleApiError } from 'src/utils/error-handle';

// import { deleteLoan } from 'src/apis/loan';
import { allLoans, deleteLoan } from 'src/apis/loan';
import AlertNotifications from 'src/layouts/dashboard/common/alert-notifications';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import { loanInterface } from './type';
import FormNewLoan from '../form-new-loan';
import LoanTableRow from '../loan-table-row';
import TableNoData from '../../common/table-no-data';
import ComoonTableHead from '../../common/table-head';
import TableToolbar from '../../common/table-toolbar';
import TableEmptyRows from '../../common/table-empty-rows';
import { emptyRows, applyFilter, getComparator } from '../../utils';

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

  const [message, setMessage] = useState('');

  const [loanId, setLoanId] = useState(null);

  const [stateLoan, setStateLoan] = useState(loanInterface);

  const [openDialog, setOpenDialog] = useState(false);

  const [loanList, setLoanList] = useState([]);

const auth = useAuth(); 

  const {isLoading, refetch: refetchLoans} = useQuery("allLoans", allLoans, {
    onSuccess: (response) => {
      setLoanList(response.Loans);
    },
    onError: (error) => {
      handleApiError(error, auth);
    }
  });

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = loanList.map((n) => ({
        name: n.client.name,
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
    setLoanId(null);
    setStateLoan(loanInterface)
  };

  const dataFiltered = applyFilter({
    inputData: loanList,
    comparator: getComparator(order, orderBy),
    filterName,
    field: 'client',
  });

  const handleDelete = async () => {
    try {
      await Promise.all(
        selected.map(async (l) => {
          const result = await deleteLoan(l.id);
          return result;
        })
      );
      setAlert(true);
      setMessage('Empréstimo excluído com sucesso')
      setOpenDialog(false);
      setSelected([]);
      refetchLoans();
    } catch (error) {
      const errorMessage = await handleApiError(error, auth);
      if (errorMessage) {
        setAlertError(true);
        setMessage(errorMessage);
      } else {
        setAlertError(true);
        setMessage("Erro ao excluir empréstimos");
      }
      setOpenDialog(false);
      setSelected([]);
    }
  };

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Empréstimos</Typography>
        {isLoading && <CircularProgress /> }
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
          {newLoan && (
            <Button color="inherit" onClick={handleCloseAdd}>
              <CloseIcon />
            </Button>
          )}
        </Stack>
      </Stack>
      {newLoan && (
        <FormNewLoan
          filterName={filterName}
          onFilterName={handleFilterByName}
          setNewLoan={setNewLoan}
          setAlert={setAlert}
          setAlertError={setAlertError}
          setMessage={setMessage}
          setStateLoan= {setStateLoan}
          stateLoan={stateLoan}
          loanId={loanId}
          setLoanId={setLoanId}
          refetchLoans={refetchLoans}
      
        />
      )}

      {alert && (
        <AlertNotifications
          alert={alert}
          setAlert={setAlert}
          message={message}
        />
      )}
      {alertError && (
        <AlertNotifications
          alertError={alertError}
          setAlertError={setAlertError}
          message={message}
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
                rowCount={loanList.length}
                onRequestSort={handleSort}
                numSelected={selected.length}
                onSelectAllClick={handleSelectAllClick}
                isLoan
                headLabel={[
                  { id: 'client', label: 'Cliente' },
                  { id: 'value', label: 'Valor Solicitado' },
                  // { id: 'banner', label: 'Bandeira' },
                  // // { id: 'valueMachine', label: 'Valor Máquina' },
                  // { id: 'installments', label: 'Parcelas' },
                  { id: 'grossProfit', label: 'Lucro Bruto' },
                  { id: 'partner', label: 'Parceiro' },
                  { id: 'partnerProfit', label: 'Lucro Parceiro' },
                  { id: 'netProfit', label: 'Lucro Líquido' },
                  { id: 'paymentStatus', label: 'Status Pagamento' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <LoanTableRow
                      key={row.id}
                      id={row.id}
                      client={row.client}
                      value={row.askValue}
                      dateCreated={row.createdAt}
                      dateUpdated={row.updatedAt}
                      cards={row.cards}
                      paymentStatus={row.paymentStatus}
                      grossProfit={row.grossProfit}
                      partner={row.partner}
                      partnerProfit={row.partnerAmount}
                      netProfit={row.profit}
                      selected={selected.some((item) => item.name === row.client.name)}
                      handleClick={(event) => handleClick(event, row.client.name, row.id)}
                      setStateLoan={setStateLoan}
                      setNewLoan={setNewLoan}
                      setAlert={setAlert}
                      setLoanId={setLoanId}
                      setAlertError={setAlertError}
                      setMessage={setMessage}
                      refetchLoans={refetchLoans}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, loanList.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={loanList.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
