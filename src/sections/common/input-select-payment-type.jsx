import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';


export default function SelectPaymentType({ value, onChange, machineSelected }) {
  
  
  const currenciesFilter = () =>{
    let currencies = [];
    if(!machineSelected){
      return currencies;
    }
    const isPresentialTax = Object.values(machineSelected.presentialTax).some((tax) => tax !== '' && tax !== null);
    const isOnlineTax = Object.values(machineSelected.onlineTax).some((tax) => tax !== '' && tax !== null);
    if (isPresentialTax && isOnlineTax){
      currencies = [
        {
          value: 'presentialTax',
          label: 'Presencial',
        },
        {
          value: 'onlineTax',
          label: 'Online',
        },
      ];
    } else if (isPresentialTax && !isOnlineTax){
      currencies = [
        {
          value: 'presentialTax',
          label: 'Presencial',
        }
      ];
    } else {
      currencies = [
        {
          value: 'onlineTax',
          label: 'Online',
        }
      ];
    }
    return currencies;
  }
  return (
    <Box component="form" noValidate autoComplete="off" width={{ xs: '100%', md: '30%' }}>
      <div>
        <TextField
          fullWidth
          id="select-payment-type"
          select
          label="Tipo do Pagamento"
          defaultValue="presentialTax"
          value={value}
          onChange={onChange}
          helperText="Selecione o tipo do pagamento"
        >
          {currenciesFilter().map((option) => (
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
  machineSelected: PropTypes.any,
  onChange: PropTypes.func,
};
