import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

const currencies = [
  {
    value: 'present',
    label: 'Presencial',
  },
  {
    value: 'online',
    label: 'Online',
  },
];

export default function SelectPaymentType({ value, onChange }) {
  return (
    <Box component="form" noValidate autoComplete="off" width="36%">
      <div>
        <TextField
          fullWidth
          id="select-payment-type"
          select
          label="Tipo do Pagamento"
          defaultValue="present"
          value={value}
          onChange={onChange}
          helperText="Selecione o tipo do pagamento"
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

SelectPaymentType.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func,
};
