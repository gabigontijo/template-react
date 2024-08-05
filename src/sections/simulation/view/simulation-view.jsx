import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useQuery } from 'react-query';
import { useRef, useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { useAuth } from 'src/hooks/authProvider';

import { handleApiError } from 'src/utils/error-handle';

import { allCardMachines } from 'src/apis/card-machine';

import { machineInterface } from 'src/sections/machine/view/type';

import { simulationInterface } from './type';
import TableSimulation from '../table-simulation';
import FormNewSimulation from '../form-new-simulation';

// ----------------------------------------------------------------------

export default function SimulationPage() {
  const [machineList, setMachineList] = useState([machineInterface]);
  const [stateSimulation, setStateSimulation] = useState(simulationInterface);
  const [isSimulation, setIsSimulation] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [paramsSimulation, setParamsSimulation] = useState(simulationInterface);

  const tableSimulationRef = useRef(null);

  const auth = useAuth();

  const { isLoading } = useQuery('allCardMachines', allCardMachines, {
    onSuccess: (response) => {
      setMachineList(response.CardMachines);
    },
    onError: (error) => {
      console.error('Erro ao carregar Maquininhas:', error);
      handleApiError(error, auth);
    },
  });

  useEffect(() => {
    html2canvas(tableSimulationRef.current).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      // eslint-disable-next-line new-cap
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save('simulation.pdf');

      setIsExporting(false);
    });
  }, [isExporting])
  const handleExportPDF = () => {
    setIsExporting(true);
  };

  return (
    <Container>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 1, sm: 1 }}>
        <Stack width={{ xs: '100%', md: '60%' }}>
          <Box>
            <Typography variant="h4" mb={5}>
              Simulações
            </Typography>
            <FormNewSimulation
              stateSimulation={stateSimulation}
              setStateSimulation={setStateSimulation}
              setIsSimulation={setIsSimulation}
              setParamsSimulation={setParamsSimulation}
              machineList={machineList}
              setMachineList={setMachineList}
              isLoading={isLoading}
              isSimulation={isSimulation}
            />
          </Box>
        </Stack>

        {isSimulation && (
          <Stack>
            <Box sx={{ width: '100%', display: 'flex' }}>
              <Typography variant="h6" gutterBottom component="div" ml={2}>
                {paramsSimulation.mode === 'Presencial' ? 'Presencial' : 'Online'}
              </Typography>
            </Box>
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              spacing={{ xs: 2, sm: 4 }}
              width={{ xs: '100%', md: '100%' }}
              justifyContent="center"
            >
              {paramsSimulation.selectedMachines.map((machineName) => (
                <Box width={{ xs: '100%', md: '100%' }}>
                  <TableSimulation
                    mode={paramsSimulation.mode}
                    value={paramsSimulation.value}
                    machineName={machineName}
                    machineList={machineList}
                    paramsSimulation={paramsSimulation}
                  />
                </Box>
              ))}
            </Stack>
            <Typography variant="p" mt={4}>
              Simulado em: <b>{paramsSimulation.date}</b>
            </Typography>
            <Box
              width={{ xs: '100%', md: '100%' }}
              display="flex"
              direction="row"
              justifyContent="flex-end"
              mt={3}
            >
              <div style={{ height: '30px' }} />
              <LoadingButton
                width="80%"
                size="large"
                type="submit"
                variant="contained"
                color="primary"
                onClick={handleExportPDF}
              >
                Exportar simulação
              </LoadingButton>
            </Box>
          </Stack>
        )}
        {isExporting && (
          <Container ref={tableSimulationRef} >
            <Stack sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
              <Box
                component="img"
                src="/assets/images/CashbycardLogo.fw.png"
                sx={{ width: 210, height: 70, mb: 2, mt: 2, display: 'flex', alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}
              />
            </Stack>
            <Stack>
              <Stack
                direction='row'
                spacing={{ xs: 1, sm: 1 }}
                width={{ xs: '100%', md: '100%' }}
                justifyContent="center"
              >
                {paramsSimulation.selectedMachines.map((machineName) => (
                  <Box width={{ xs: '100%', md: '100%' }}>
                    <TableSimulation
                      mode={paramsSimulation.mode}
                      value={paramsSimulation.value}
                      machineName={machineName}
                      machineList={machineList}
                      paramsSimulation={paramsSimulation}
                      pdf
                    />
                  </Box>
                ))}
              </Stack>
              <Typography variant="p" mt={3}>
                Simulado em: <b>{paramsSimulation.date} *</b>
              </Typography>
                <Typography variant="p" gutterBottom component="div" mb={5}>
                  {paramsSimulation.mode === 'Presencial'
                    ? 'Simulação de empréstimo Presencial'
                    : 'Simulação de empréstimo Online'}
                </Typography>
              <Typography variant="p" mt={1.5}>
                <b>* A simulação tem validade de 48 horas</b>
              </Typography>
            </Stack>
          </Container>
        )}
      </Stack>
    </Container>
  );
}
