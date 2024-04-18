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

import { deleteClient } from 'src/apis/client';
import { machineMock } from 'src/_mock/machine';
import { allCardMachines } from 'src/apis/card-machine';
import AlertNotifications from 'src/layouts/dashboard/common/alert-notifications';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import { machineInterface } from './type';
import FormNewMachine from '../form-new-machine';
import MachineTableRow from '../machine-table-row';
import TableNoData from '../../common/table-no-data';
import ComoonTableHead from '../../common/table-head';
import TableToolbar from '../../common/table-toolbar';
import TableEmptyRows from '../../common/table-empty-rows';
import { emptyRows, applyFilter, getComparator } from '../../utils';

// ----------------------------------------------------------------------

export default function MachinePage() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [newMachine, setNewMachine] = useState(false);

  const [alert, setAlert] = useState(false);

  const [alertError, setAlertError] = useState(false);

  const [messageError, setMessageError] = useState('');

  const [messageAlert, setMessageAlert] = useState('');

  const [machineId, setMachineId] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);

  const [machineList, setMachineList] = useState(machineMock);

  const [stateMachine, setStateMachine] = useState( machineInterface);

  const {isLoading, refetch: refetchMachines} = useQuery("allCardMachines", allCardMachines, {
    onSuccess: (response) => {
      setMachineList(response.CardMachines);
    },
    onError: (error) => {
      console.error('Erro ao carregar maquininhas:', error);
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
      const newSelecteds = machineList.map((n) => ({
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
    setNewMachine(true);
  };

  const handleCloseAdd = () => {
    setNewMachine(false);
    setMachineId(null);
    setStateMachine(machineInterface);
  };

  const dataFiltered = applyFilter({
    inputData: machineList,
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
      refetchMachines();
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
        <Typography variant="h4">Maquininhas</Typography>
        {isLoading && <CircularProgress /> }
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
          spacing={2}
        >
          {!newMachine && (
            <Button
              variant="contained"
              color="inherit"
              startIcon={<Iconify icon="eva:plus-fill" />}
              onClick={handleAddUser}
            >
              Nova Maquininha
            </Button>
          )}
          {newMachine && (
            <Button color="inherit" onClick={handleCloseAdd}>
              <CloseIcon />
            </Button>
          )}
        </Stack>
      </Stack>
      {newMachine && (
        <FormNewMachine
          setNewMachine={setNewMachine}
          setAlert={setAlert}
          setAlertError={setAlertError}
          setMessageAlert={setMessageAlert}
          setMessageError={setMessageError}
          machineId={machineId}
          setMachineId={setMachineId}
          refetchMachines={refetchMachines}
          setStateMachine={setStateMachine}
          stateMachine={stateMachine}
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
          placeholder="Procurar maquininhas..."
          message="maquininha"
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <ComoonTableHead
                order={order}
                orderBy={orderBy}
                rowCount={machineList.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                isLoan={false}
                headLabel={[
                  { id: 'name', label: 'Nome' },
                  { id: 'brand', label: 'Bandeiras' },
                  { id: 'installments', label: 'Parcelas' },
                  { id: 'presentialTax', label: 'Taxa Presencial' },
                  { id: 'onlineTax', label: 'Taxa Online' },
                  { id: '' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <MachineTableRow
                      index={index}
                      key={`${row.id}_${row.name}`}
                      id={row.id}
                      name={row.name}
                      brand={row.brand}
                      installments={row.installments}
                      presentialTax={row.presentialTax}
                      onlineTax={row.onlineTax}
                      selected={selected.some((item) => item.name === row.name)}
                      handleClick={(event) => handleClick(event, row.name, row.id)}
                      setMachineId={setMachineId}
                      setStateMachine={setStateMachine}
                      setNewMachine={setNewMachine}
                      setAlert={setAlert}
                      setAlertError={setAlertError}
                      setMessageError={setMessageError}
                      setMessageAlert={setMessageAlert}
                      refetchMachines={refetchMachines}
                      createDate={row.CreatedAt}
                      updateDate={row.UpdatedAt}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, machineList.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={machineList.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
