import PropTypes from 'prop-types';
import { useState } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';

import { createCardMachine, updateCardMachine } from 'src/apis/card-machine';

import TableTax from './table-tax';
import { machineInterface } from './view/type';
import MultipleSelectMachine from '../common/multiple-select-brand';

// ----------------------------------------------------------------------

export default function FormNewMachine({
  setNewMachine,
  setAlert,
  setAlertError,
  setNextStep,
  setMessageError,
  setMessageAlert,
  machineId,
  setMachineId,
  refetchMachines,
  stateMachine,
  setStateMachine,
  sxMachine,
}) {

  const [tempInput, setTempInput] = useState(stateMachine.installments);
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
      // console.log(bodyMachine);
      // console.log('stateMahine', stateMachine);
      setAlert(true);
      setMessageAlert('Maquininha cadastrada com sucesso');
      setNewMachine(false);
      setStateMachine(machineInterface);
      refetchMachines();
    } catch (error) {
      // eslint-disable-next-line no-debugger
      // debugger;
      setAlertError(true);
      setMessageError('Erro ao Cadastrar a Maquininha');
      console.log('Erro ao Cadastrar a Maquininha:', error);
    }
  };

  const handleSubmitEdit = async () => {
    try {
      // eslint-disable-next-line no-debugger
      // debugger;
      console.log(stateMachine);
      const nonEmptyState = Object.fromEntries(
        Object.entries(stateMachine).map(([key, value]) => [key, value || ''])
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
      setMessageAlert('Maquininha editada com sucesso');
      setStateMachine(machineInterface);
      refetchMachines();
    } catch (error) {
      setAlertError(true);
      setMessageError('Erro ao Editar a maquininha');
      setNewMachine(true);
      console.log('Erro ao Editar a maquininha:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setStateMachine({
      ...stateMachine,
      [name]: value,
    });
    console.log(Number(value));
  };


  const handleInstallmentChange = (event) => {
    // Armazenar temporariamente o valor digitado pelo usuário
    setTempInput(event.target.value);
  };

  const handleKeyPress = (event) => {
    console.log(event.target.value);
    if (event.key === 'Enter') {
    setStateMachine({
      ...stateMachine,
      installments: event.target.value,
    });
    }
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
              value={tempInput}
              onChange={(event) => setTempInput(event.target.value)}
              onKeyPress={handleKeyPress} 
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
            <TableTax installments={stateMachine.installments} setStateMachine={setStateMachine} stateMachine={stateMachine} presential listTax={stateMachine.presentialTax} />
          </Box>
          <Box width={{ xs: '100%', md: '47%' }}>
            <TableTax installments={stateMachine.installments} setStateMachine={setStateMachine} stateMachine={stateMachine} presential = {false} listTax={stateMachine.onlineTax} />
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
  setNextStep: PropTypes.func,
  setMessageError: PropTypes.func,
  setMessageAlert: PropTypes.func,
  setMachineId: PropTypes.func,
  machineId: PropTypes.any,
  refetchMachines: PropTypes.func,
  stateMachine: PropTypes.any,
  setStateMachine: PropTypes.func,
  sxMachine: PropTypes.object,
};
