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

import { allPartners, deletePartner } from 'src/apis/partner';
import AlertNotifications from 'src/layouts/dashboard/common/alert-notifications';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import { partnerInterface } from './type';
import FormNewPartner from '../form-new-partner';
import PartnerTableRow from '../partner-table-row';
import TableNoData from '../../common/table-no-data';
import ComoonTableHead from '../../common/table-head';
import TableToolbar from '../../common/table-toolbar';
import TableEmptyRows from '../../common/table-empty-rows';
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

  const [message, setMessage] = useState('');

  const [partnerId, setPartnerId] = useState(null);

  const [partnerList, setPartnerList] = useState([]);

  const [statePartner, setStatePartner] = useState(partnerInterface);

  const [openDialog, setOpenDialog] = useState(false);

  const auth = useAuth();

  const {isLoading, refetch: refetchPartners} = useQuery("allPartners", allPartners, {
    onSuccess: (response) => {
      setPartnerList(response.Partners);
    },
    onError: (error) => {
      handleApiError(error, auth);
      console.error('Erro ao carregar parceiros:', error);
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
      const newSelecteds = partnerList.map((n) => ({
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
    setPartnerId(null);
    setStatePartner(partnerInterface);
  };

  const dataFiltered = applyFilter({
    inputData: partnerList,
    comparator: getComparator(order, orderBy),
    filterName,
    field: 'name',
  });

  const handleDelete = async () => {
    try {
       await Promise.all(
        selected.map(async (partner) => {
          const result = await deletePartner(partner.id);
          return result;
        })
      );
      setAlert(true);
      setMessage('Parceiro deletado com sucesso');
      setOpenDialog(false);
      setSelected([]);
      refetchPartners();
    } catch (error) {
      console.error('Erro ao excluir parceiros:', error);
      setAlertError(true);
      setMessage('Erro ao Deletar o parceiro');
      setOpenDialog(false);
      setSelected([]);
      handleApiError(error, auth);
    }
  };

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Parceiros</Typography>
        {isLoading && <CircularProgress /> }
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
          {newPartner && (
            <Button color="inherit" onClick={handleCloseAdd}>
              <CloseIcon />
            </Button>
          )}
        </Stack>
      </Stack>
      {newPartner && (
        <FormNewPartner
          setNewPartner={setNewPartner}
          setAlert={setAlert}
          setAlertError={setAlertError}
          setMessage={setMessage}
          partnerId={partnerId}
          setPartnerId={setPartnerId}
          refetchPartners={refetchPartners}
          setStatePartner={setStatePartner}
          statePartner={statePartner}
        />
      )}
      {alert && (
        <AlertNotifications alert={alert} setAlert={setAlert} message={message} />
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
          handleDelete={handleDelete}
          selected={selected}
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          placeholder="Procurar parceiros..."
          message="parceiro"
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <ComoonTableHead
                order={order}
                orderBy={orderBy}
                rowCount={partnerList.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                isLoan={false}
                headLabel={[
                  { id: 'name', label: 'Nome' },
                  { id: 'email', label: 'Email' },
                  { id: 'phone', label: 'Telefone' },
                  { id: 'cpf', label: 'CPF' },
                  { id: 'pixType', label: 'Tipo Pix' },
                  { id: 'pixKey', label: 'Chave Pix' },
                  { id: 'address', label: 'Endereço' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <PartnerTableRow
                      key={row.id}
                      id={row.id}
                      name={row.name}
                      email={row.email}
                      phone={row.phone}
                      cpf={row.cpf}
                      pixType={row.pixType}
                      pixKey={row.pixKey}
                      address={row.address}
                      selected={selected.some((item) => item.name === row.name)}
                      handleClick={(event) => handleClick(event, row.name, row.id)}
                      setPartnerId={setPartnerId}
                      setNewPartner={setNewPartner}
                      setAlert={setAlert}
                      setAlertError={setAlertError}
                      setMessage={setMessage}
                      refetchPartners={refetchPartners}
                      setStatePartner={setStatePartner}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, partnerList.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={partnerList.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
