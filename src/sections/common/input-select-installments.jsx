import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';



export default function SelectInstallments({ numInstallments }) {
    const installmentsOptions = Array.from({ length: numInstallments }, (_, index) => ({
        value: `${index + 1}`,
        label: `${index + 1}`,
      }));
  return (
    <Box component="form" noValidate autoComplete="off" width="33%">
      <div>
        <TextField
          fullWidth
          id="installments"
          select
          label="Parcelas"
          defaultValue="1"
          helperText="Selecione quantas parcelas"
        >
          {installmentsOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
    </Box>
  );
}

SelectInstallments.propTypes = {
  numInstallments: PropTypes.number,
};