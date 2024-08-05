import { useEffect } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';

import { useAuth } from 'src/hooks/authProvider';

import { handleApiError } from 'src/utils/error-handle';

import { createCardMachine, updateCardMachine } from 'src/apis/card-machine';

import TableTax from './table-tax';
import { machineInterface } from './view/type';
import MultipleSelectMachine from '../common/multiple-select-brand';

// ----------------------------------------------------------------------

export default function FormNewMachine({
  setNewMachine,
  setAlert,
  setAlertError,
  setMessage,
  machineId,
  setMachineId,
  refetchMachines,
  stateMachine,
  setStateMachine,
  sxMachine,
}) {


  useEffect(()=> {},[stateMachine.installments, stateMachine.onlineTax, stateMachine.presentialTax])

  const auth = useAuth();

  const handleSubmit = async () => {
    try {
      const bodyMachine = {
        name: stateMachine.name,
        brand: stateMachine.brand,
        presentialTax: stateMachine.presentialTax,
        onlineTax: stateMachine.onlineTax,
        installments: Number(stateMachine.installments),
      };
      await createCardMachine(bodyMachine);
      setAlert(true);
      setMessage('Maquininha cadastrada com sucesso');
      setNewMachine(false);
      setStateMachine(machineInterface);
      refetchMachines();
    } catch (error) {
      const errorMessage = await handleApiError(error, auth);
      if (errorMessage) {
        setAlertError(true);
        setMessage(errorMessage);
      } else {
        setAlertError(true);
        setMessage("Erro ao Cadastrar a Maquininha");
      }
    }
  };

  const handleSubmitEdit = async () => {
    try {
      const nonEmptyState = Object.fromEntries(
        Object.entries(stateMachine)?.map(([key, value]) => [key, value || ''])
      );
      const  bodyMachineEdit = {
        name: nonEmptyState.name,
        brand: nonEmptyState.brand,
        presentialTax: nonEmptyState.presentialTax,
        onlineTax: nonEmptyState.onlineTax,
        installments: Number(nonEmptyState.installments),
      };
      await updateCardMachine(bodyMachineEdit, machineId);
      setNewMachine(false);
      setMachineId(null);
      setAlert(true);
      setMessage('Maquininha editada com sucesso');
      setStateMachine(machineInterface);
      refetchMachines();
    } catch (error) {
      const errorMessage = await handleApiError(error, auth);
      if (errorMessage) {
        setAlertError(true);
        setMessage(errorMessage);
      } else {
        setAlertError(true);
        setMessage("Erro ao editar maquininha");
      }
      setNewMachine(true);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setStateMachine({
      ...stateMachine,
      [name]: value,
    });
  }; 
  
  const handleChangeInstallments = (event) => {
    const { name, value } = event.target;
  const listTaxLength = Object.keys(stateMachine.presentialTax).length
   if (value !== '') {
      const newListTax = JSON.parse(JSON.stringify(stateMachine.presentialTax))
      if (listTaxLength > value) {
        for (let i = Number(value) + 1; i <= listTaxLength; i += 1) {
          delete newListTax[i];
        }
      } else if (listTaxLength < value) {
        for (let i = listTaxLength + 1; i <= Number(value); i += 1) {
          newListTax[i] = null;
        }
      } else {
        return;
      }

      setStateMachine({ 
        ...stateMachine, 
        [name]: value,
        onlineTax: newListTax, 
        presentialTax: newListTax 
      });
      return
    }

    setStateMachine({ 
      ...stateMachine, 
      [name]: value,
    });
  };

  return (
    <>
      <Stack spacing={{ xs: 1, sm: 2 }} sx={sxMachine}>
        <Stack spacing={{ xs: 1, sm: 2 }}
          direction="row"
          useFlexGap
          sx={{
            flexWrap: {
              xs: 'wrap',
              sm: 'nowrap',
            },
          }}>
          <Box width={{ xs: '100%', md: '60%' }}>
            <TextField
              name="name"
              label="Nome da maquininha"
              type="text"
              value={stateMachine.name}
              onChange={handleChange}
              fullWidth
            />
          </Box>
          <Box width={{ xs: '100%', md: '30%' }}>
            <TextField
              id="outlined-number"
              label="Parcelas"
              name='installments'
              helperText="Pressione o Enter duas vezes"
              type="number"
              value={stateMachine.installments}
              onChange={handleChangeInstallments}
              fullWidth
              
            />
          </Box>
          <Box width={{ xs: '100%', md: '40%' }}>
            <MultipleSelectMachine brand={stateMachine.brand} setBrand={setStateMachine} />
          </Box>
        </Stack>

        <Stack
          spacing={{ xs: 1, sm: 2 }}
          direction="row"
          useFlexGap
          sx={{
            flexWrap: {
              xs: 'wrap',
              sm: 'nowrap',
            },
          }}
        >
          <Box width={{ xs: '100%', md: '47%' }}>
            <TableTax setStateMachine={setStateMachine} stateMachine={stateMachine} presential listTax={stateMachine.presentialTax} />
          </Box>
          <Box width={{ xs: '100%', md: '47%' }}>
            <TableTax setStateMachine={setStateMachine} stateMachine={stateMachine} presential = {false} listTax={stateMachine.onlineTax} />
          </Box>
        </Stack>
      </Stack>
      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 2 }}>
        {machineId === null && (
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            color="success"
            onClick={handleSubmit}
          >
            Cadastrar Maquininha
          </LoadingButton>
        )}
        {machineId !== null && (
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            color="inherit"
            onClick={handleSubmitEdit}
          >
            Editar Maquininha
          </LoadingButton>
        )}
      </Stack>
    </>
  );
}

FormNewMachine.propTypes = {
  setNewMachine: PropTypes.func,
  setAlert: PropTypes.func,
  setAlertError: PropTypes.func,
  setMessage: PropTypes.func,
  setMachineId: PropTypes.func,
  machineId: PropTypes.any,
  refetchMachines: PropTypes.func,
  stateMachine: PropTypes.any,
  setStateMachine: PropTypes.func,
  sxMachine: PropTypes.object,
};
