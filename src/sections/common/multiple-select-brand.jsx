import PropTypes from 'prop-types';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import OutlinedInput from '@mui/material/OutlinedInput';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const brandList = [
  'Visa',
  'Mastercard',
  'Elo',
  'Hipercard',
  'American Express',
];

export default function MultipleSelectMachine({brand, setBrand}) {

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setBrand((prevBrand) => ( {
        ...prevBrand,
        'brand': typeof value === 'string' ? value.split(',') : value,
    }
    ));
  };

  return (
      <FormControl fullWidth>
        <InputLabel id="multiple-checkbox-machine">Bandeira</InputLabel>
        <Select
          labelId="multiple-checkbox-machine"
          id="checkbox-machine"
          multiple
          value={brand}
          onChange={handleChange}
          input={<OutlinedInput label="Bandeiras" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {brandList.map((brd) => (
            <MenuItem key={brd} value={brd}>
              <Checkbox checked={brand.indexOf(brd) > -1} />
              <ListItemText primary={brd} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
  );
}

MultipleSelectMachine.propTypes = {
    setBrand: PropTypes.func,
    brand: PropTypes.any,
  };
  