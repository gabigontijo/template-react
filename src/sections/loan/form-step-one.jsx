// import { useState } from 'react';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { allClients } from 'src/apis/client';

import Iconify from 'src/components/iconify';

import FormNewClient from '../client/form-new-client';

// ----------------------------------------------------------------------

export default function FormStepOne({
  setAlert,
  isNewClient,
  setIsNewClient,
  setAlertError,
  setClientName,
  clientName,
  setNextStep,
  loanToEdit,
  setMessageAlert,
  setMessageError,
  setLoan,
  loan,
}) {
  const [clientsList, setClientsList] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);

  useEffect(() => {
    const loadAllClients = async () => {
      try {
        const clients = await allClients();
        setClientsList(clients);
        setFilteredClients(clients);
      } catch (error) {
        console.log('Erro ao carregar clientes', error);
      }
    };
    loadAllClients();
  }, []);

  const handleNewClient = () => {
    setIsNewClient(true);
    // setCloseAdd(true);
  };

  const handleCloseClient = () => {
    setIsNewClient(false);
    // setCloseAdd(true);
  };

  const onClientSelect = (client) => {
    setSelectedClient(client);
    setLoan({
      ...loan,
      'client': client,
    });
  };

  return (
    <Card sx={{ marginTop: '1.5em' }}>
      <Stack direction="row" spacing={3} p={3} alignItems="center">
        <Box width="50%">
          <Stack direction="row" justifyContent="flex-start" alignContent="center">
            <Autocomplete
              disablePortal
              id="client-autocomplete"
              options={clientsList}
              getOptionLabel={(option) => option.name}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Procurar cliente" />}
              onChange={(event, value) => onClientSelect(value)}
              value={selectedClient}
            />
          </Stack>
          <Box sx={{ margin: 3 }}>
            <ul>
              {filteredClients.map((client) => (
                <li key={client.id}>{client.name}</li>
              ))}
            </ul>
          </Box>
        </Box>
        <Box width="50%">
          <Stack direction="row" justifyContent="flex-end" alignItems="center">
            {!isNewClient ? (
              <Button
                variant="contained"
                color="success"
                startIcon={<Iconify icon="eva:plus-fill" />}
                onClick={handleNewClient}
              >
                Novo Cliente
              </Button>
            ) : (
              <Button color="inherit" onClick={handleCloseClient}>
                <CloseIcon />
              </Button>
            )}
          </Stack>
        </Box>
      </Stack>
      {isNewClient && (
        <Box sx={{ margin: 3 }}>
          <FormNewClient
            setNewUser={setIsNewClient}
            setAlert={setAlert}
            setMessageAlert={setMessageAlert}
            setMessageError={setMessageError}
            setAlertError={setAlertError}
            setClientName={setClientName}
            setNextStep={setNextStep}
          />
        </Box>
      )}
    </Card>
  );
}

FormStepOne.propTypes = {
  setAlert: PropTypes.func,
  setMessageAlert: PropTypes.func,
  setMessageError: PropTypes.func,
  isNewClient: PropTypes.bool,
  setIsNewClient: PropTypes.func,
  clientName: PropTypes.string,
  setAlertError: PropTypes.func,
  setClientName: PropTypes.func,
  setNextStep: PropTypes.func,
  setLoan: PropTypes.func,
  loan: PropTypes.any,
  loanToEdit: PropTypes.any,
};
