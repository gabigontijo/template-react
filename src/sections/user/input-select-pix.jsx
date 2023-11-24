import * as React from 'react';

import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

const currencies = [
  {
    value: 'cpf',
    label: 'CPF',
  },
  {
    value: 'celphone',
    label: 'Celular',
  },
  {
    value: 'email',
    label: 'Email',
  },
  {
    value: 'random',
    label: 'Aleatório',
  },
];

export default function SelectPixFields() {
  return (
    <Box component="form" noValidate autoComplete="off" >
      <div>
        <TextField
          fullWidth
          id="outlined-select-currency"
          select
          label="Tipo Pix"
          defaultValue="cpf"
          helperText="Selecione o Tipo do Pix"
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
