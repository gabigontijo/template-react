import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';



export default function SelectInstallments({ cardMachineList, value, onChange, cardMachineId }) {
  const numInstallments = cardMachineList.find((machine) => machine.id === cardMachineId)?.installments
  const installmentsOptions = Array.from({ length: Number(numInstallments) }, (_, index) => ({
    value: `${index + 1}`,
    label: `${index + 1}`,
  }));
  console.log('numInstallments',numInstallments);
  console.log('numInstallments typeof', typeof(numInstallments));
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
          value={value}
          onChange={onChange}
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
  value: PropTypes.any,
  onChange:  PropTypes.func,
  cardMachineList: PropTypes.any,
  cardMachineId: PropTypes.any,
};