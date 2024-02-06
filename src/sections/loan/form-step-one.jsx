import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

import Iconify from 'src/components/iconify';

import FormNewClient from '../client/form-new-client';
import { clientInterface } from '../client/view/type';

// ----------------------------------------------------------------------

export default function FormStepOne({
  setAlert,
  isNewClient,
  setIsNewClient,
  setAlertError,
  setNextStep,
  setMessageAlert,
  setMessageError,
  setLoan,
  loan,
  clientList,
  isLoading,
  refetchClients,
}) {

  const handleNewClient = () => {
    setIsNewClient(true);
    setLoan({
      ...loan,
      'client': clientInterface,
    });
    // setCloseAdd(true);
  };

  const handleCloseClient = () => {
    setIsNewClient(false);
    // setCloseAdd(true);
  };

  const onClientSelect = (client) => {

    setIsNewClient(false);
    setLoan({
      ...loan,
      'client': client || clientInterface,
    });
  };
  const setClient = (client) => {
    setLoan({
      ...loan,
      'client': client,
    });
  }
  return (
    <Card sx={{ marginTop: '1.5em' }}>
      {isLoading && <Box sx={{ display: 'flex', justifyContent: 'center', mt: '1em'}}>
        <CircularProgress />
      </Box>}
      <Stack direction="row" spacing={3} p={3} alignItems="center">
        <Box width="50%" sx={{ height: 'fit-content' }}>
          <Autocomplete
            // disablePortal
            ListboxProps={{ maxHeight: '200px' }}
            id="client-autocomplete"
            options={clientList}
            getOptionLabel={(option) => option.name}
            sx={{ width: '100%', display: 'inline-block', zIndex: 15000 }}
            value={clientList.find((client) => client.id === loan.client.id) || null}
            renderInput={(params) => <TextField {...params} label="Procurar cliente" />}
            onChange={(event, value) => onClientSelect(value)}
          />
        </Box>
        <Box width="50%">
          <Stack direction="row" alignItems="center">
            {!isNewClient ? (
              <Tooltip title="Novo Cliente">
               <IconButton aria-label="delete" onClick={handleNewClient} size="large" color="primary" >
                <Iconify icon="bx:user-plus" />
             </IconButton>
             </Tooltip>
            ) : (
              <Button color="inherit" onClick={handleCloseClient}>
                <CloseIcon />
              </Button>
            )}
          </Stack>
        </Box>
      </Stack>
      {
        isNewClient && (
          <Box sx={{ margin: 3 }}>
            <FormNewClient
              setNewUser={setIsNewClient}
              setAlert={setAlert}
              setMessageAlert={setMessageAlert}
              setMessageError={setMessageError}
              setAlertError={setAlertError}
              setNextStep={setNextStep}
              refetchClients={refetchClients}
              setStateClient={setClient}
              stateClient={loan.client}
              clientId={null}
            />
          </Box>
        )
      }
    </Card >
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
  setNextStep: PropTypes.func,
  setLoan: PropTypes.func,
  loan: PropTypes.any,
  clientList: PropTypes.any,
  isLoading: PropTypes.any,
  refetchClients: PropTypes.func,
};
