import PropTypes from 'prop-types';

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

export default function SelectPixFields({ pixType, handleChange }) {
  return (
    <Box component="form" noValidate autoComplete="off">
      <div>
        <TextField
          fullWidth
          id="outlined-select-currency"
          select
          label="Tipo Pix"
          defaultValue=""
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
  pixType: PropTypes.string,
  handleChange: PropTypes.func,
};
