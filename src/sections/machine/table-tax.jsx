import PropTypes from 'prop-types';

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
  setStateMachine,
  stateMachine,
  presential,
  listTax,
}) {
  const handleChange = (installment, tax) => {
    listTax[installment] = tax;
    if (presential) {
      setStateMachine({ ...stateMachine, presentialTax: listTax });

      
    } else {
      setStateMachine( ({ ...stateMachine, onlineTax: listTax }));
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 350 }} aria-label="tax table" size="small">
        <TableHead>
          <Typography variant="h8" gutterBottom component="div" align="center" sx={{ margin: 1 }}>
            {presential ? 'Taxa Presencial' : 'Taxa Online'}
          </Typography>
          <TableRow key={presential ? `${stateMachine.name}Taxa Presencial` : `${stateMachine.name}Taxa Online`}>
            <TableCell>Parcelas</TableCell>
            <TableCell>Taxa %</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(listTax)?.map((row, index) => (
            <TableRow key={presential ? `Presencial_${row}_${index}` : `Online_${row}_${index}`} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row}
              </TableCell>
              <TableCell align="right">
                <PercentFormatField
                  name="taxa"
                  label={`Taxa parcela ${row}`}
                  value={listTax[row] ?? ""}
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
  setStateMachine: PropTypes.func,
  stateMachine: PropTypes.any,
  presential: PropTypes.bool,
  listTax: PropTypes.any,
};
