import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';


export default function SelectNumberOfCardsFields({numberOfCards, handleNumberOfCards}) {
  const currencies = Array.from( { length: 10 }, (_, index) => ({
    value: `${index + 1}`,
    label: `${index + 1}`,
  }));
  return (
    <Box component="form" noValidate autoComplete="off" width="50%">
      <div>
        <TextField
          fullWidth
          id="number-of-cards"
          select
          label="Quantos Cartões"
          defaultValue="1"
          helperText="Selecione quantos cartões"
          value={numberOfCards}
          onChange={handleNumberOfCards}
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

SelectNumberOfCardsFields.propTypes = {
  numberOfCards: PropTypes.string,
  handleNumberOfCards: PropTypes.func,
};
