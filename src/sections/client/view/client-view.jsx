import { useState, useEffect } from 'react';

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

import { clients } from 'src/_mock/clients';
import { allClients, deleteClient } from 'src/apis/client';
import AlertNotifications from 'src/layouts/dashboard/common/alert-notifications';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import FormNewClient from '../form-new-client';
import ClientTableRow from '../client-table-row';
import TableNoData from '../../common/table-no-data';
import ComoonTableHead from '../../common/table-head';
import TableToolbar from '../../common/table-toolbar';
import TableEmptyRows from '../../common/table-empty-rows';
import { emptyRows, applyFilter, getComparator } from '../../utils';

// ----------------------------------------------------------------------

export default function ClientPage() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [newUser, setNewUser] = useState(false);

  const [alert, setAlert] = useState(false);

  const [alertError, setAlertError] = useState(false);

  const [messageError, setMessageError] = useState('');

  const [messageAlert, setMessageAlert] = useState('');

  const [editClient, setEditClient] = useState(false);

  const [clientId, setClientId] = useState('');

  const [clientToEdit, setClientToEdit] = useState({});

  const [openDialog, setOpenDialog] = useState(false);

  const [clientList, setClientList] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await allClients();
        setClientList(response.Clients);
      } catch (error) {
        console.error('Erro ao carregar clientes:', error);
      }
    };

    fetchClients();
  }, []);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = clients.map((n) => ({
        name: n.name,
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
    setNewUser(true);
  };

  const handleCloseAdd = () => {
    setNewUser(false);
    setEditClient(false);
  };

  const dataFiltered = applyFilter({
    inputData: clientList,
    comparator: getComparator(order, orderBy),
    filterName,
    field: 'name',
  });

  const handleDelete = async () => {
    try {
      const results = await Promise.all(
        selected.map(async (client) => {
          const result = await deleteClient(client.id);
          return result;
        })
      );
      console.log(results);
      setAlert(true);
      setMessageAlert('Cliente deletado com sucesso');
      setOpenDialog(false);
      setSelected([]);
    } catch (error) {
      console.error('Erro ao excluir clientes:', error);
      setAlertError(true);
      setMessageError('Erro ao excluir clientes');
      setOpenDialog(false);
      setSelected([]);
    }
  };

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Clientes</Typography>
        {/* <div>
          {test.map((client, index) => (
            <>
            <p> teste</p>
            <p key={index}>{client.Name}</p>
            </>
          ))}
          <>
        </div> */}
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
        <FormNewClient
          setNewUser={setNewUser}
          setAlert={setAlert}
          setAlertError={setAlertError}
          clientToEdit={clientToEdit}
          setMessageAlert={setMessageAlert}
          setMessageError={setMessageError}
        />
      )}

      {alert && <AlertNotifications alert={alert} setAlert={setAlert} message={messageAlert} />}
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
          handleDelete={handleDelete}
          selected={selected}
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          placeholder="Procurar clientes..."
          message="cliente"
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <ComoonTableHead
                order={order}
                orderBy={orderBy}
                rowCount={clientList.length}
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
                  .map((row, index) => (
                    <ClientTableRow
                      index={index}
                      key={row.id}
                      id={row.ID}
                      name={row.Name}
                      phone={row.phone}
                      cpf={row.cpf}
                      pixType={row.pixType}
                      pixKey={row.pixKey}
                      partner={row.partner}
                      documents={row.documents}
                      // avatarUrl={row.avatarUrl}
                      selected={selected.some((item) => item.name === row.name)}
                      handleClick={(event) => handleClick(event, row.name, row.id)}
                      setEditClient={setEditClient}
                      setClientId={setClientId}
                      setClientToEdit={setClientToEdit}
                      setNewUser={setNewUser}
                      setAlert={setAlert}
                      setAlertError={setAlertError}
                      setMessageError={setMessageError}
                      setMessageAlert={setMessageAlert}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, clients.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={clients.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
