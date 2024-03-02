import { useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

import { allCardMachines } from 'src/apis/card-machine';

import { machineInterface } from '../machine/view/type';
import DialogSimulation from '../common/dialog-simulation';
import NumberFormatField from '../common/number-format-field';
import PercentFormatField from '../common/percent-format-field';
import MultipleSelectModeSimulation from '../common/multiple-select-mode-simulation';

// ----------------------------------------------------------------------

export default function FormNewSimulation({setMachineSelected, stateSimulation, setStateSimulation}) {
  const [machineList, setMachineList] = useState([machineInterface]);
  const [machineTaxMode, setMachineTaxMode] = useState({ Online: false, Presencial: false });
  const [messageNotification, setMessageNotification] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  const {isLoading} = useQuery('allCardMachines', allCardMachines, {
    onSuccess: (response) => {
      setMachineList(response.CardMachines);
    },
    onError: (error) => {
      console.error('Erro ao carregar Maquininhas:', error);
    },
  });

  const witchMachineTax = (machine) => {
    const presentialTaxIsEmpty = Object.values(machine.presentialTax).some(
      (value) => value === '' || value === null
    );
    const onlineTaxIsEmpty = Object.values(machine.onlineTax).some(
      (value) => value === '' || value === null
    );
    setMachineTaxMode({ Online: !onlineTaxIsEmpty, Presencial: !presentialTaxIsEmpty });
  };

  const onMachineSelect = (value) => {
    console.log('valueMachine-----------------------', value);
    setStateSimulation({
      ...stateSimulation,
      machineId: value.id,
      machineName: value.name,
    });
    witchMachineTax(value);
    setMachineSelected(value);
  };

  const onChangeLoanType = (event) => {
    const { value } = event.target;
    setStateSimulation({
      ...stateSimulation,
      loanType: value,
    });
  };

  const handleChange = (name, value) => {
    setStateSimulation({
      ...stateSimulation,
      [name]: value,
    });
  };

  const checkForm = () => {
    console.log(stateSimulation);
    const keys = Object.keys(stateSimulation);
    return keys.every((key) => stateSimulation[key]);
  };

  const handleSimulation = () => {
    const teste = checkForm();
    console.log('teste', teste);
    if (!teste) {
      setMessageNotification('Campos não preenchidos corretamente');
      setOpenDialog(true);
      return;
    }
    const modeLength = stateSimulation.mode.length;
    if (modeLength > 1) {
      if (!machineTaxMode.presencial) {
        setMessageNotification('Maquininha selecionada não possui modo Presencial');
        setOpenDialog(true);
      } else if (!machineTaxMode.online) {
        setMessageNotification('Maquininha selecionada não possui modo Online');
        setOpenDialog(true);
      } else {
        console.log('dois selecionados', stateSimulation);
      }
    } else {
      if (stateSimulation.mode[0] === 'Presencial' && !machineTaxMode.presencial) {
        setMessageNotification('Maquininha selecionada não possui modo Presencial');
        setOpenDialog(true);
      }
      if (stateSimulation.mode[0] === 'Online' && !machineTaxMode.online) {
        setMessageNotification('Maquininha selecionada não possui modo online');
        setOpenDialog(true);
      } else {
        console.log('um selecioando', stateSimulation);
      }
    }
    console.log(stateSimulation);
  };

  return (
    <Stack spacing={{ xs: 1, sm: 2 }}>
         {isLoading && <CircularProgress /> }
      <Stack direction="column" spacing={{ xs: 1, sm: 2 }}>
        <Box width={{ xs: '100%', md: '60%' }}>
          <TextField
            name="client"
            label="Nome do cliente"
            type="text"
            value={stateSimulation.client}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            fullWidth
          />
        </Box>
        <Box width={{ xs: '100%', md: '60%' }}>
          <Autocomplete
            disablePortal
            id="machine-autocomplete"
            options={machineList}
            getOptionLabel={(option) => option.name}
            sx={{ width: '100%' }}
            value={machineList.find((machine) => machine.id === stateSimulation.machineId) || null}
            renderInput={(params) => <TextField {...params} label="Procurar maquininha" />}
            onChange={(event, value) => onMachineSelect(value)}
          />
        </Box>
        <Box width={{ xs: '100%', md: '60%' }}>
          <MultipleSelectModeSimulation mode={stateSimulation.mode} setMode={setStateSimulation} />
        </Box>
        <Box width={{ xs: '100%', md: '60%' }}>
          <div>
            <TextField
              fullWidth
              id="typeSimulation"
              select
              label="Tipo de simulação"
              defaultValue={1}
              helperText="Selecione o tipo de simulação"
              value={stateSimulation.loanType}
              onChange={onChangeLoanType}
            >
              <MenuItem key="defined_value" value={1}>
                Valor definido
              </MenuItem>
              <MenuItem key="defined_limit" value={2}>
                Limite definido
              </MenuItem>
            </TextField>
          </div>
        </Box>
        <Box width={{ xs: '100%', md: '60%' }}>
          <NumberFormatField
            name="value"
            label="Valor"
            value={stateSimulation.value}
            handleChange={(e) => handleChange(e.target.name, Number(e.target.value))}
          />
        </Box>
        <Box width={{ xs: '100%', md: '60%' }}>
          <PercentFormatField
            name="operationPercent"
            label="Taxa de Operação"
            value={stateSimulation.operationPercent}
            handleChange={(e) => handleChange(e.target.name, Number(e.target.value))}
          />
        </Box>
        <Box width={{ xs: '100%', md: '60%' }}>
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            color="success"
            onClick={handleSimulation}
          >
            Simular
          </LoadingButton>
        </Box>
      </Stack>
      <DialogSimulation message={messageNotification} open={openDialog} setOpen={setOpenDialog} />
    </Stack>
  );
}

FormNewSimulation.propTypes = {
  setMachineSelected: PropTypes.func,
  setStateSimulation: PropTypes.func,
  stateSimulation: PropTypes.any,
};
