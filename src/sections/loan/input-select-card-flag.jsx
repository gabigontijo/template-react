import * as React from 'react';

import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

const currencies = [
  {
    value: 'visa',
    label: 'Visa',
  },
  {
    value: 'mastercard',
    label: 'Mastercard',
  },
  {
    value: 'elo',
    label: 'Elo',
  },
  {
    value: 'hipercard',
    label: 'Hipercard',
  },
  {
    value: 'americanExpress',
    label: 'American Express',
  }
];

export default function SelectCardFlag() {
  return (
    <Box component="form" noValidate autoComplete="off" width="33%">
      <div>
        <TextField
          fullWidth
          id="card-flag"
          select
          label="Bandeira"
          defaultValue="visa"
          helperText="Selecione a bandeira"
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
