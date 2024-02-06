import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

export default function SelectCardFlag({name, value, onChange, cardMachineList, cardMachineId}) {
  const brandsString = cardMachineList.find((machine) => machine.id === cardMachineId)?.brand;
  let brandMap = [];
  if (typeof brandsString === 'string') {
  brandMap = JSON.parse(brandsString);
  };

  return (
    <Box component="form" noValidate autoComplete="off" width="33%">
      <div>
        <TextField
          fullWidth
          id="card-flag"
          select
          label="Bandeira"
          helperText="Selecione a bandeira"
          value={value}
          onChange={onChange}
          name={name}
        >
          {brandMap.map((option) => (
            <MenuItem key={`option${option}`} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </div>
    </Box>
  );
}


SelectCardFlag.propTypes = {
  value: PropTypes.any,
  name: PropTypes.any,
  cardMachineList: PropTypes.any,
  onChange: PropTypes.func,
  cardMachineId: PropTypes.any,
};

