import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
// import Alert from '@mui/material/Alert';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
// import Snackbar from '@mui/material/Snackbar';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { users } from 'src/_mock/user';
import AlertNotifications from 'src/layouts/dashboard/common/alert-notifications';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import FormNewUser from '../form-new-user';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../../utils';

// ----------------------------------------------------------------------

export default function UserPage() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [newUser, setNewUser] = useState(false);

  const [alert, setAlert] = useState(false);

  const [alertError, setAlertError] = useState(false);

  const [alertEdit, setAlertEdit] = useState(false);

  const [alertDelete, setAlertDelete] = useState(false);

  const [alertDeleteError, setAlertDeleteError] = useState(false);

  const [editClient, setEditClient] = useState(false);

  const [clientId, setClientId] = useState('');

  const [clientToEdit, setClientToEdit] = useState({});

  const [alertEditError, setAlertEditError] = useState(false);

  useEffect(() => {
    console.log(alertDeleteError);
  }, [alertDeleteError]);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
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
    setNewUser(true);
  };

  const handleCloseAdd = () => {
    setNewUser(false);
    setEditClient(false);
  };

  const dataFiltered = applyFilter({
    inputData: users,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Clientes</Typography>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
          spacing={2}
        >
          {!newUser && (
            <Button
              variant="contained"
              color="inherit"
              startIcon={<Iconify icon="eva:plus-fill" />}
              onClick={handleAddUser}
            >
              Novo Cliente
            </Button>
          )}
          {(newUser || editClient) && (
            <Button color="inherit" onClick={handleCloseAdd}>
              <CloseIcon />
            </Button>
          )}
        </Stack>
      </Stack>
      {(newUser || editClient) && (
        <FormNewUser
          setNewUser={setNewUser}
          setAlert={setAlert}
          setAlertError={setAlertError}
          clientToEdit={clientToEdit}
          setAlertEdit={setAlertEdit}
        />
      )}

      {alert && (
        <AlertNotifications
          alert={alert}
          setAlert={setAlert}
          message="Cliente cadastrado com sucesso"
        />
      )}
      {alertEdit && (
        <AlertNotifications
          alert={alertEdit}
          setAlert={setAlertEdit}
          message="Cliente editado com sucesso"
        />
      )}
      {alertError && (
        <AlertNotifications
          alertError={alertError}
          setAlertError={setAlertError}
          message="Erro ao cadastrar o cliente"
        />
      )}
      {alertEditError && (
        <AlertNotifications
          alertError={alertEditError}
          setAlertError={setAlertEditError}
          message="Erro ao editar o cliente"
        />
      )}
      {alertDelete && (
        <AlertNotifications
          alert={alertDelete}
          setAlert={setAlertDelete}
          message="Cliente Deletado com sucesso"
        />
      )}
      {alertDeleteError && (
        <AlertNotifications
          alertError={alertDeleteError}
          setAlertError={setAlertDeleteError}
          message="Erro ao deletar o cliente"
        />
      )}

      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={users.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'name', label: 'Nome' },
                  { id: 'phone', label: 'Telefone' },
                  { id: 'cpf', label: 'CPF' },
                  { id: 'pixType', label: 'Tipo Pix' },
                  { id: 'pixKey', label: 'Chave Pix' },
                  { id: 'partner', label: 'Parceiro' },
                  { id: 'documents', label: 'Documentos' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <UserTableRow
                      key={row.id}
                      id={row.id}
                      name={row.name}
                      phone={row.phone}
                      cpf={row.cpf}
                      pixType={row.pixType}
                      pixKey={row.pixKey}
                      partner={row.partner}
                      documents={row.documents}
                      avatarUrl={row.avatarUrl}
                      selected={selected.indexOf(row.name) !== -1}
                      handleClick={(event) => handleClick(event, row.name)}
                      setEditClient={setEditClient}
                      setClientId={setClientId}
                      setClientToEdit={setClientToEdit}
                      setAlertEditError={setAlertEditError}
                      setNewUser={setNewUser}
                      setAlertDelete={setAlertDelete}
                      setAlertDeleteError={setAlertDeleteError}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, users.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
