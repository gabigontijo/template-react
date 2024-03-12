import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';

import SvgBrand from '../common/brand-svg';
import CardIcon from '../common/card-brand-icon';
import { definedLimit, definedValue } from '../loan/service';

export default function TableSimulation({
  machineList,
  mode,
  value,
  paramsSimulation,
  machineName,
  pdf,
}) {
  let valorFormatado = '';
  if (!Number.isNaN(value)) {
    valorFormatado = value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  const findMachine = machineList.find((machine) => machine.name === machineName);
  const parseBrand = JSON.parse(findMachine.brand) || [];
  const objectTax = mode === 'Presencial' ? findMachine.presentialTax : findMachine.onlineTax;

  const calcualteValue = (installments) => {
    if (paramsSimulation.loanType === 1) {
      const resultDF = definedValue(
        value,
        installments,
        paramsSimulation.operationPercent,
        objectTax
      );
      resultDF.clientAmount = resultDF.clientAmount.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });
      resultDF.installmentsValue = resultDF.installmentsValue.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });
      resultDF.machineValue = resultDF.machineValue.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });
      return resultDF;
    }
    const resultDL = definedLimit(
      value,
      installments,
      paramsSimulation.operationPercent,
      objectTax
    );
    resultDL.clientAmount = resultDL.clientAmount.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
    resultDL.installmentsValue = resultDL.installmentsValue.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
    resultDL.machineValue = resultDL.machineValue.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
    return resultDL;
  };
  return (
    <TableContainer component={Paper} sx={{ border: '3px solid #F4F6F8' }}>
      <Stack
        spacing={{ xs: 1, sm: 2 }}
        direction="column"
        alignItems={{ xs: 'initial' }}
        width="100%"
      >
        <Box width="100%">
          <Stack
            direction="row"
            alignItems={{ xs: 'end', md: 'end' }}
            // justifyContent={{ xs: 'end', md: 'end' }}
            width="100%"
          >
            <Typography
              variant="h6"
              gutterBottom
              component="div"
              ml={2}
            >
              VALOR
            </Typography>
            <Typography
              variant="h6"
              gutterBottom
              component="div"
              ml={2}
              mr={2}
              mt={2}
              color="#EB001B"
            >
              {valorFormatado}
            </Typography>
          </Stack>
        </Box>
      </Stack>
      <Table sx={{ minWidth: 360 }} aria-label="tax simulation" size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography
                variant="p"
                style={{ textTransform: 'uppercase', fontWeight: 'bold', color: '#212B36' }}
              >
                Parcelas
              </Typography>
            </TableCell>
            <TableCell>
            <Typography
                variant="p"
                style={{ textTransform: 'uppercase', fontWeight: 'bold', color: '#212B36' }}
              >
                 Valor
              </Typography>
               </TableCell>
            <TableCell >
            <Typography
                variant="p"
                style={{ textTransform: 'uppercase', fontWeight: 'bold', color: '#EB001B' }}
              >
               Valor Final
              </Typography>
                </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(objectTax).map((row, index) => (
            <TableRow
              key={`row${mode}${row}`}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
              <Typography
                variant="p"
                style={{ textTransform: 'uppercase', fontWeight: 'bold', color: '#7030B5'}}
              >
               {row}
              </Typography>
              </TableCell>
              <TableCell>{calcualteValue(row).installmentsValue}</TableCell>
              <TableCell>{calcualteValue(row).machineValue}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Stack
        spacing={{ xs: 1, sm: 3 }}
        direction="row"
        useFlexGap
        justifyContent="center"
        mt={3}
        mb={3}
        sx={{
          flexWrap: {
            xs: 'wrap',
            sm: 'nowrap',
          },
        }}
      >
        {parseBrand.map((b, index) =>
          pdf ? (
            <SvgBrand key={index} brand={b} />
          ) : (
            <CardIcon key={index} brandIcon={b} size={60} />
          )
        )}
      </Stack>
    </TableContainer>
  );
}

TableSimulation.propTypes = {
  machineName: PropTypes.any,
  machineList: PropTypes.any,
  mode: PropTypes.any,
  value: PropTypes.any,
  paramsSimulation: PropTypes.any,
  pdf: PropTypes.bool,
};
