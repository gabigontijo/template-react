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

import { partners } from 'src/_mock/partner';
import { deletePartner } from 'src/apis/partner';
import AlertNotifications from 'src/layouts/dashboard/common/alert-notifications';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import FormNewPartner from '../form-new-partner';
import PartnerTableRow from '../partner-table-row';
import TableNoData from '../../client/table-no-data';
import TableEmptyRows from '../../client/table-empty-rows';
import PartnerTableToolbar from '../partner-table-toolbar';
import ClientTableHead from '../../client/client-table-head';
import { emptyRows, applyFilter, getComparator } from '../../utils';


// ----------------------------------------------------------------------

export default function PartnerPage() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [newPartner, setNewPartner] = useState(false);

  const [alert, setAlert] = useState(false);

  const [alertError, setAlertError] = useState(false);

  const [alertEdit, setAlertEdit] = useState(false);

  const [alertDelete, setAlertDelete] = useState(false);

  const [alertDeleteError, setAlertDeleteError] = useState(false);

  const [editPartner, setEditPartner] = useState(false);

  const [partnerId, setPartnerId] = useState('');

  const [partnerToEdit, setPartnerToEdit] = useState({});

  const [alertEditError, setAlertEditError] = useState(false);

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
      const newSelecteds = partners.map((n) => ({
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
    setNewPartner(true);
  };

  const handleCloseAdd = () => {
    setNewPartner(false);
    setEditPartner(false);
  };

  const dataFiltered = applyFilter({
    inputData: partners,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const handleDelete = async () => {
    try {
       const results = await Promise.all(selected.map( async (client) => {
        const result = await deletePartner(client.id);
        return result;
       }));
       console.log(results);
       setAlertDelete(true)
       setOpenDialog(false);
       setSelected([]);
       
      } catch (error) {
        console.error('Erro ao excluir parceiros:', error)
        setAlertDeleteError(true);
        setOpenDialog(false);
        setSelected([]);
    }
}

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container >
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Parceiros</Typography>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
          spacing={2}
        >
          {!newPartner && (
          <Button
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleAddUser}
          >
            Novo Parceiro
          </Button>
          )}
          {(newPartner || editPartner) && (
            <Button color="inherit" onClick={handleCloseAdd}>
              <CloseIcon />
            </Button>
          )}
        </Stack>
      </Stack>
      {(newPartner || editPartner) && (
        <FormNewPartner
          setNewPartner={setNewPartner}
          setAlert={setAlert}
          setAlertError={setAlertError}
          partnerToEdit={partnerToEdit}
          setAlertEdit={setAlertEdit}
         
        />
      )}
      {alert && (
        <AlertNotifications
          sendAlert={alert}
          setSendAlert={setAlert}
          message="Parceiro cadastrado com sucesso!"
        />
      )}
      {alertEdit && (
        <AlertNotifications
          alert={alertEdit}
          setAlert={setAlertEdit}
          message="parceiro editado com sucesso"
        />
      )}
      {alertError && (
        <AlertNotifications
          alertError={alertError}
          setAlertError={setAlertError}
          message="Erro ao cadastrar o parceiro"
        />
      )}
      {alertEditError && (
        <AlertNotifications
          alertError={alertEditError}
          setAlertError={setAlertEditError}
          message="Erro ao editar o parceiro"
        />
      )}
      {alertDelete && (
        <AlertNotifications
          alert={alertDelete}
          setAlert={setAlertDelete}
          message="parceiro Deletado com sucesso"
        />
      )}
      {alertDeleteError && (
        <AlertNotifications
          alertError={alertDeleteError}
          setAlertError={setAlertDeleteError}
          message="Erro ao deletar o parceiro"
        />
      )}

      <Card>
        <PartnerTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
          handleDelete={handleDelete}
          selected={selected}
          openDialog = { openDialog }
          setOpenDialog = {setOpenDialog}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth:800 }}>
              <ClientTableHead
                order={order}
                orderBy={orderBy}
                rowCount={partners.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'name', label: 'Nome' },
                  { id: 'email', label: 'Email' },
                  { id: 'phone', label: 'Telefone' },
                  { id: 'cpf', label: 'CPF' },
                  { id: 'pixType', label: 'Tipo Pix' },
                  { id: 'pixKey', label: 'Chave Pix' },
                  { id: 'adress', label: 'Endereço' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <PartnerTableRow
                      key={row.id}
                      name={row.name}
                      email={row.email}
                      phone={row.phone}
                      cpf={row.cpf}
                      pixType={row.pixType}
                      pixKey={row.pixKey}
                      adress={row.adress}
                      avatarUrl={row.avatarUrl}
                      selected={selected.some((item) => item.name === row.name)}
                      handleClick={(event) => handleClick(event, row.name, row.id)}
                      setEditClient={setEditPartner}
                      setClientId={setPartnerId}
                      setClientToEdit={setPartnerToEdit}
                      setAlertEditError={setAlertEditError}
                      setNewUser={setNewPartner}
                      setAlertDelete={setAlertDelete}
                      setAlertDeleteError={setAlertDeleteError}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, partners.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={partners.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
