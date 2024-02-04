import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

const currencies = [
  {
    value: 'machin-1',
    label: 'Maquininha 1',
  },
  {
    value: 'machin-2',
    label: 'Maquininha 2',
  },
  {
    value: 'machin-2',
    label: 'Maquininha 2',
  }
];

export default function SelectMachin({name, value, onChange}) {
  return (
    <Box component="form" noValidate autoComplete="off" width="33%">
      <div>
        <TextField
          fullWidth
          id="select-machin"
          select
          label="Maquininha"
          defaultValue="machin-1"
          helperText="Selecione a Maquininha"
          value={value}
          onChange={onChange}
          name={name}
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

SelectMachin.propTypes = {
  value: PropTypes.any,
  name: PropTypes.any,
  onChange: PropTypes.func,
};

