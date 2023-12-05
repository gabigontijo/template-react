import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

const currencies = [
  {
    value: 'inPerson',
    label: 'Presencial',
  },
  {
    value: 'online',
    label: 'Online',
  }
];

export default function SelectPaymentType() {
  return (
    <Box component="form" noValidate autoComplete="off" width="36%">
      <div>
        <TextField
          fullWidth
          id="select-payment-type"
          select
          label="Tipo do Pagamento"
          defaultValue="inPerson"
          helperText="Selecione o tipo do pagamento"
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
