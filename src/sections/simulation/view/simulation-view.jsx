import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { machineInterface } from 'src/sections/machine/view/type';

import { simulationInterface } from './type';
import TableSimulation from '../table-simulation';
import FormNewSimulation from '../form-new-simulation';

// ----------------------------------------------------------------------

export default function SimulationPage() {
  const [machineSelected, setMachineSelected] = useState(machineInterface);
  const [stateSimulation, setStateSimulation] = useState(simulationInterface);
  const [isPresencial, setIsPresencial] = useState(true);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    if (stateSimulation.mode.includes('Presencial')) {
      setIsPresencial(true);
    } else {
      setIsPresencial(false);
    }
    if (stateSimulation.mode.includes('Online')) {
      setIsOnline(true);
    } else {
      setIsOnline(false);
    }
  }, [stateSimulation]);

  return (
    <Container>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 1, sm: 1 }}>
        <Stack width={{ xs: '100%', md: '100%' }}>
          <Box>
            <Typography variant="h4" mb={2}>
              Simulação
            </Typography>
            <FormNewSimulation
              setMachineSelected={setMachineSelected}
              stateSimulation={stateSimulation}
              setStateSimulation={setStateSimulation}
            />
          </Box>
        </Stack>
        <Stack direction="row" spacing={{ xs: 1, sm: 1 }} width={{ xs: '100%', md: '100%' }} justifyContent='center'>
          <Box width={{ xs: '100%', md: '100%' }}>
            {isPresencial && (
              <TableSimulation
                mode="Presencial"
                objectTax={machineSelected.presentialTax}
                value={stateSimulation.value}
              />
            )}
          </Box>
          <Box width={{ xs: '100%', md: '100%' }}>
            {isOnline && (
              <TableSimulation
                mode="Online"
                objectTax={machineSelected.onlineTax}
                value={stateSimulation.value}
              />
            )}
          </Box>
        </Stack>
      </Stack>
    </Container>
  );
}
