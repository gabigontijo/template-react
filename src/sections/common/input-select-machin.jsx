import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

export default function SelectMachin({name, value, onChange, cardMachineList}) {
  return (
    <Box component="form" noValidate autoComplete="off" width={{ xs: '100%', md: '30%' }}>
      <div>
        <TextField
          fullWidth
          id="select-machin"
          select
          label="Maquininha"
          helperText="Selecione a Maquininha"
          value={value}
          onChange={onChange}
          name={name}
        >
          {cardMachineList.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
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
  cardMachineList: PropTypes.any,
  onChange: PropTypes.func,
};

