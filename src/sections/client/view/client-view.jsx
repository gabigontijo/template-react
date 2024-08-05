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

import { useAuth } from 'src/hooks/authProvider';

import { handleApiError } from 'src/utils/error-handle';

import { allClients, deleteClient } from 'src/apis/client';
import AlertNotifications from 'src/layouts/dashboard/common/alert-notifications';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import { clientInterface } from './type';
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

  const [message, setMessage] = useState('');

  const [clientId, setClientId] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);

  const [clientList, setClientList] = useState([]);

  const [stateClient, setStateClient] = useState( clientInterface);

  const [clientDocuments, setClientDocuments] = useState([]);

  const auth = useAuth()

  const {isLoading, refetch: refetchClients} = useQuery("allClients", allClients, {
    onSuccess: (response) => {
      setClientList(response.Clients);
    },
    onError: (error) => handleApiError(error, auth),
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
      const newSelecteds = clientList.map((n) => ({
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
    setClientId(null);
    setStateClient(clientInterface);
  };

  const dataFiltered = applyFilter({
    inputData: clientList,
    comparator: getComparator(order, orderBy),
    filterName,
    field: 'name',
  });

  const handleDelete = async () => {
    try {
     await Promise.all(
        selected.map(async (client) => {
          const result = await deleteClient(client.id);
          return result;
        })
      );
      setAlert(true);
      setMessage('Cliente deletado com sucesso');
      setOpenDialog(false);
      setSelected([]);
      refetchClients();
    } catch (error) {
      const errorMessage = await handleApiError(error, auth);
      if (errorMessage) {
        setAlertError(true);
        setMessage(errorMessage);
      } else {
        setAlertError(true);
        setMessage("Erro ao excluir cliente");
      }
      setOpenDialog(false);
      setSelected([]);
    }
  };

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Clientes</Typography>
        {isLoading && <CircularProgress /> }
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
          {newUser && (
            <Button color="inherit" onClick={handleCloseAdd}>
              <CloseIcon />
            </Button>
          )}
        </Stack>
      </Stack>
      {newUser && (
        <FormNewClient
          setNewUser={setNewUser}
          setAlert={setAlert}
          setAlertError={setAlertError}
          setMessage={setMessage}
          clientId={clientId}
          setClientId={setClientId}
          refetchClients={refetchClients}
          setStateClient={setStateClient}
          stateClient={stateClient}
          setClientDocuments={setClientDocuments}
          clientDocuments={clientDocuments}
        />
      )}

      {alert && <AlertNotifications alert={alert} setAlert={setAlert} message={message} />}
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
                isLoan={false}
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
                      id={row.id}
                      name={row.name}
                      phone={row.phone}
                      cpf={row.cpf}
                      pixType={row.pixType}
                      pixKey={row.pixKey}
                      partner={row.partner.name}
                      documents={row.documents}
                      selected={selected.some((item) => item.name === row.name)}
                      handleClick={(event) => handleClick(event, row.name, row.id)}
                      setClientId={setClientId}
                      setStateClient={setStateClient}
                      setNewUser={setNewUser}
                      setAlert={setAlert}
                      setAlertError={setAlertError}
                      setMessage={setMessage}
                      refetchClients={refetchClients}
                      setClientDocuments={setClientDocuments}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, clientList.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={clientList.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
