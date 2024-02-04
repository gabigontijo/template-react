import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

const status = [
  {
    value: 1,
    label: 'Pago',
  },
  {
    value: 2,
    label: 'Processando',
  }
];

export default function PaymentStatus({ paymentStatus, handleChange }) {
  return (
    <Box component="form" noValidate autoComplete="off">
      <div>
        <TextField
          fullWidth
          id="outlined-select-currency"
          select
          defaultValue={1}
          label="Tipo Pix"
          helperText="Selecione o Tipo do Pix"
          name="pixType"
          value={paymentStatus}
        
          onChange={handleChange}
        >
          {status.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
    </Box>
  );
}

PaymentStatus.propTypes = {
  paymentStatus: PropTypes.any,
  handleChange: PropTypes.func,
};
