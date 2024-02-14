import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

const currencies = [
  {
    value: 1,
    label: 'Valor Definido',
  },
  {
    value: 2,
    label: 'Limite Definido',
  }
];

export default function SelectTypeLoan({ loanType, handleChange }) {
  return (
    <Box component="form" noValidate autoComplete="off">
      <div>
        <TextField
          fullWidth
          id="outlined-select-currency"
          select
          defaultValue={1}
          label="Tipo Empréstimo"
          helperText="Selecione o Tipo do Empréstimo"
          name="loanType"
          value={loanType}
        
          onChange={handleChange}
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
    </Box>
  );
}

SelectTypeLoan.propTypes = {
  loanType: PropTypes.any,
  handleChange: PropTypes.func,
};
