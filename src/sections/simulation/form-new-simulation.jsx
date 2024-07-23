import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import CircularProgress from '@mui/material/CircularProgress';

import { fDate } from 'src/utils/format-time';

import { simulationInterface } from './view/type';
import DialogMessage from '../common/dialog-message';
import NumberFormatField from '../common/number-format-field';
import PercentFormatField from '../common/percent-format-field';
import MultipleSelectMachineSimulation from '../common/multiple-select-machine-simulation';

// ----------------------------------------------------------------------

export default function FormNewSimulation({
  stateSimulation,
  setStateSimulation,
  setIsSimulation,
  isSimulation,
  setParamsSimulation,
  machineList,
  isLoading,
}) {
  const [machineFilterList, setMachineFilterList] = useState([]);
  const [messageNotification, setMessageNotification] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    let filterMachine = [];
    if (stateSimulation.mode === 'Presencial') {
      filterMachine = machineList.filter((machine) =>
        Object.values(machine.presentialTax).some((value) => value !== '' && value !== null)
      );
      setMachineFilterList(filterMachine);
    }
    if (stateSimulation.mode === 'Online') {
      filterMachine = machineList.filter((machine) =>
        Object.values(machine.onlineTax).some((value) => value !== '' && value !== null)
      );
      setMachineFilterList(filterMachine);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateSimulation.mode]);

  useEffect(() => {

  },[setIsSimulation])

  const onChangeLoanType = (event) => {
    const { value } = event.target;
    setStateSimulation({
      ...stateSimulation,
      loanType: value,
      date: fDate(Date.now(), 'dd MMM yyyy HH:mm'),
    });
  };

  const handleChange = (name, value) => {
    setStateSimulation({
      ...stateSimulation,
      [name]: value,
    });
  };

  const handleMachineChange = (event) => {
    const { value: selectedValue } = event.target;
    let newSelectedMachine = [];
    if (
      stateSimulation.selectedMachines.length === 2 &&
      !stateSimulation.selectedMachines.includes(selectedValue)
    ) {
      const [, secondSelectedValue] = stateSimulation.selectedMachines;
      newSelectedMachine = [secondSelectedValue, selectedValue.pop()];
    } else if (stateSimulation.selectedMachines.length < 2) {
      newSelectedMachine = selectedValue;
    }
    setStateSimulation({ ...stateSimulation, selectedMachines: newSelectedMachine.flat() });
  };

  const checkForm = () => {
    const keys = Object.keys(stateSimulation);
    return keys.every((key) => stateSimulation[key]);
  };

  const handleSimulation = () => {
    const teste = checkForm();
    if (!teste) {
      setMessageNotification('Campos não preenchidos corretamente');
      setOpenDialog(true);
      return;
    }
    setParamsSimulation(stateSimulation);
    setIsSimulation(true);
    setStateSimulation(simulationInterface);
  };

  return (
    <Stack spacing={{ xs: 1, sm: 2 }}>
      {isLoading && <CircularProgress />}
      {!isSimulation && (      
      <Stack direction="column" spacing={{ xs: 1, sm: 2 }}>
        <Box width={{ xs: '100%', md: '60%' }}>
          <div>
            <TextField
              fullWidth
              id="modeSimulation"
              select
              label="Modo"
              name="mode"
              defaultValue="Presencial"
              helperText="Selecione o modo da simulação"
              value={stateSimulation.mode}
              onChange={(event) => handleChange(event.target.name, event.target.value)}
            >
              <MenuItem key="defined_value" value="Presencial">
                Presencial
              </MenuItem>
              <MenuItem key="defined_limit" value="Online">
                Online
              </MenuItem>
            </TextField>
          </div>
        </Box>
        <Box width={{ xs: '100%', md: '60%' }}>
          <MultipleSelectMachineSimulation
            machineList={machineFilterList}
            selectedMachines={stateSimulation.selectedMachines}
            onChange={handleMachineChange}
          />
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
        )}
      <DialogMessage message={messageNotification} open={openDialog} setOpen={setOpenDialog} title='Erro para simular'/>
        { isSimulation && 
        <Box width={{ xs: '100%', md: '60%' }}>
          <div style={{height: '30px'}}/>
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          color="success"
          onClick={()=> setIsSimulation(false)}
        >
          Nova Simulção
        </LoadingButton>
      </Box>

        }
    </Stack>
  );
}

FormNewSimulation.propTypes = {
  setIsSimulation: PropTypes.func,
  setStateSimulation: PropTypes.func,
  isSimulation: PropTypes.any,
  stateSimulation: PropTypes.any,
  setParamsSimulation: PropTypes.func,
  machineList: PropTypes.any,
  isLoading: PropTypes.any,
};
