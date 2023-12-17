import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

const currencies = [
  {
    value: 1,
    label: 'CPF',
  },
  {
    value: 2,
    label: 'Celular',
  },
  {
    value: 3,
    label: 'Email',
  },
  {
    value: 4,
    label: 'Aleatório',
  },
];

export default function SelectPixFields({ pixType, handleChange }) {
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
          value={pixType}
        
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

SelectPixFields.propTypes = {
  pixType: PropTypes.any,
  handleChange: PropTypes.func,
};
