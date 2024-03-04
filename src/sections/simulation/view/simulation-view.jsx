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
  const [isSimulation, setIsSimulation] = useState(false);
  const [paramsSimulation, setParamsSimulation] = useState(simulationInterface);

  // useEffect(() => {
  //   const isPresencialMode = paramsSimulation.mode.includes('Presencial');
  //   const isOnlineMode = paramsSimulation.mode.includes('Online');
  //   if (isPresencialMode) {
  //     setIsPresencial(true);
  //   } else {
  //     setIsPresencial(false);
  //   }
  //   if (isOnlineMode) {
  //     setIsOnline(true);
  //   } else {
  //     setIsOnline(false);
  //   }
  //   if (isPresencialMode && isOnlineMode) {
  //     setIsPresencial(true);
  //     setIsOnline(true);
  //   } else {
  //     setIsPresencial(false);
  //     setIsOnline(false);
  //   }
  // }, [paramsSimulation]);

  useEffect(() => {
    const isPresencialMode = paramsSimulation.mode.includes('Presencial');
    const isOnlineMode = paramsSimulation.mode.includes('Online');

    // Define os estados com base nas verificações
    setIsPresencial(isPresencialMode);
    setIsOnline(isOnlineMode);

    // Verifica se ambos 'Presencial' e 'Online' estão presentes
    if (isPresencialMode && isOnlineMode) {
      setIsPresencial(true);
      setIsOnline(true);
    }
  }, [paramsSimulation]);

  return (
    <Container>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 1, sm: 1 }}>
        <Stack width={{ xs: '100%', md: '50%' }}>
          <Box>
            <Typography variant="h4" mb={2}>
              Simulação
            </Typography>
            <FormNewSimulation
              setMachineSelected={setMachineSelected}
              stateSimulation={stateSimulation}
              setStateSimulation={setStateSimulation}
              setIsSimulation={setIsSimulation}
              setParamsSimulation={setParamsSimulation}
            />
          </Box>
        </Stack>

        {isPresencial && !isOnline && isSimulation && (
          <Stack>
            <Typography variant="h6" mb={2}>
              Cliente: {paramsSimulation.client}
            </Typography>
            <Typography variant="p" mb={2}>
              Maquininha: {paramsSimulation.machineName}
            </Typography>
            <Stack
              direction="row"
              spacing={{ xs: 1, sm: 1 }}
              width={{ xs: '100%', md: '100%' }}
              justifyContent="center"
            >
              <Box width={{ xs: '100%', md: '100%' }}>
                <TableSimulation
                  mode="Presencial"
                  objectTax={machineSelected.presentialTax}
                  value={paramsSimulation.value}
                  stateMachine={machineSelected}
                />
              </Box>
            </Stack>
            <Typography variant="p" mt={4}>
              Data da simulação: {paramsSimulation.date}
            </Typography>
          </Stack>
        )}
        {!isPresencial && isOnline && isSimulation && (
          <Stack>
            <Typography variant="h6" mb={2}>
              Cliente: {paramsSimulation.client}
            </Typography>
            <Typography variant="p" mb={2}>
              Maquininha: {paramsSimulation.machineName}
            </Typography>
            <Stack
              direction="row"
              spacing={{ xs: 1, sm: 1 }}
              width={{ xs: '100%', md: '100%' }}
              justifyContent="center"
            >
              <Box width={{ xs: '100%', md: '100%' }}>
                <TableSimulation
                  mode="Online"
                  objectTax={machineSelected.onlineTax}
                  value={paramsSimulation.value}
                  stateMachine={machineSelected}
                />
              </Box>
            </Stack>
            <Typography variant="p" mt={4}>
              Data da simulação: {paramsSimulation.date}
            </Typography>
          </Stack>
        )}
        {isPresencial && isOnline && isSimulation && (
          <Stack>
            <Typography variant="h6" mb={2}>
              Cliente: {paramsSimulation.client}
            </Typography>
            <Typography variant="p" mb={2}>
              Maquininha: {paramsSimulation.machineName}
            </Typography>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={{ xs: 2, sm: 4 }}
              width={{ xs: '100%', md: '100%' }}
              justifyContent="center"
            >
              <Box width={{ xs: '100%', md: '100%' }}>
                <TableSimulation
                  mode="Online"
                  objectTax={machineSelected.onlineTax}
                  value={paramsSimulation.value}
                  stateMachine={machineSelected}
                />
              </Box>
              <Box width={{ xs: '100%', md: '100%' }}>
                <TableSimulation
                  mode="Presencial"
                  objectTax={machineSelected.presentialTax}
                  value={paramsSimulation.value}
                  stateMachine={machineSelected}
                />
              </Box>
            </Stack>
            <Typography variant="p" mt={4}>
              Data da simulação: {paramsSimulation.date}
            </Typography>
          </Stack>
        )}
      </Stack>
    </Container>
  );
}
