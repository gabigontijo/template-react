// import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

import Iconify from 'src/components/iconify';

import FormNewClient from '../client/form-new-client';

// ----------------------------------------------------------------------

export default function FormStepOne({ setSendAlert, filterName, onFilterName, isNewClient, setIsNewClient }) {

    const handleNewClient = () => {
        setIsNewClient(true);
        // setCloseAdd(true);
      };
    
      const handleCloseClient = () => {
        setIsNewClient(false);
        // setCloseAdd(true);
      };

  return (
 
    <Card sx={{ marginTop: '1.5em' }}>
    <Stack direction="row" spacing={3} p={3} alignItems="center">
      <Box width="50%">
        <Stack direction="row" justifyContent="flex-start" alignContent="center">
          <OutlinedInput
            value={filterName}
            onChange={onFilterName}
            placeholder="Procurar cliente..."
            startAdornment={
              <InputAdornment position="start">
                <Iconify
                  icon="eva:search-fill"
                  sx={{ color: 'text.disabled', width: 70, height: 20 }}
                />
              </InputAdornment>
            }
          />
        </Stack>
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
        <FormNewClient setNewUser={setIsNewClient} setAlert={setSendAlert} />
      </Box>
    )}
  </Card>

         
  );
}

FormStepOne.propTypes = {
  setSendAlert: PropTypes.func,
  isNewClient: PropTypes.bool,
  setIsNewClient: PropTypes.func,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};
