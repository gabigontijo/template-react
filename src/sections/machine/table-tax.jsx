import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';

import PercentFormatField from '../common/percent-format-field';

export default function TableTax({
  installments,
  setStateMachine,
  stateMachine,
  presential,
  listTax,
}) {
  const [installmentsTax, setInstallmentsTax] = useState(listTax);
  const populateInstallment = () => {
    // eslint-disable-next-line no-debugger
    // debugger;
    for (let i = 1; i <= installments; i += 1) {
      installmentsTax[i] = null;
      console.log('passei aqui');
    }
  };

  useEffect(() => {
    const installmentsTaxLength = Object.keys(installmentsTax).length;
    // eslint-disable-next-line no-debugger
    // debugger;
    if (installmentsTaxLength === 0) {
      populateInstallment();
    } else if (installments !== '') {
      if (installmentsTaxLength > installments) {
        for (let i = Number(installments) + 1; i <= installmentsTaxLength; i += 1) {
          delete installmentsTax[i];
        }
      } else if (installmentsTaxLength < installments) {
        console.log('não sou maior');
        for (let i = installmentsTaxLength + 1; i <= Number(installments); i += 1) {
          installmentsTax[i] = null;
        }
      } else {
        return;
      }
      setInstallmentsTax(installmentsTax);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [installments]);

  const handleChange = (installment, tax) => {
    installmentsTax[installment] = tax;
    if (presential) {
      setStateMachine({ ...stateMachine, presentialTax: installmentsTax });
      // setStateMachine((prevMachineTax) => ({ ...prevMachineTax, 'presentialTax': installmentsTax }));
    } else {
      setStateMachine((prevMachineTax) => ({ ...prevMachineTax, onlineTax: installmentsTax }));
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 350 }} aria-label="tax table" size="small">
        <TableHead>
          <Typography variant="h8" gutterBottom component="div" align="center" sx={{ margin: 1 }}>
            {presential ? 'Taxa Presencial' : 'Taxa Online'}
          </Typography>
          <TableRow>
            <TableCell>Parcelas</TableCell>
            <TableCell>Taxa %</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(installmentsTax).map((row, index) => (
            <TableRow key={presential ? `Taxa Presencial${index}` : `Taxa Online${index}`} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row}
              </TableCell>
              <TableCell align="right">
                <PercentFormatField
                  name="taxa"
                  label={`Taxa parcela ${row}`}
                  value={installmentsTax[row]}
                  handleChange={(e) => handleChange(index + 1, e.target.value)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

TableTax.propTypes = {
  installments: PropTypes.any,
  setStateMachine: PropTypes.func,
  stateMachine: PropTypes.any,
  presential: PropTypes.bool,
  listTax: PropTypes.any,
};
