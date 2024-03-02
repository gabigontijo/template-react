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

const modeList = [
  'Presencial',
  'Online',
];

export default function MultipleSelectModeSimulation({mode, setMode}) {

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setMode((prevMode) => ( {
        ...prevMode,
        'mode': typeof value === 'string' ? value.split(',') : value,
    }
    ));
  };

  return (
      <FormControl fullWidth>
        <InputLabel id="multiple-checkbox-machine">Modo</InputLabel>
        <Select
          labelId="multiple-checkbox-machine"
          id="checkbox-machine"
          multiple
          value={mode}
          onChange={handleChange}
          input={<OutlinedInput label="Modo" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {modeList.map((md) => (
            <MenuItem key={md} value={md}>
              <Checkbox checked={mode.indexOf(md) > -1} />
              <ListItemText primary={md} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
  );
}

MultipleSelectModeSimulation.propTypes = {
    setMode: PropTypes.func,
    mode: PropTypes.any,
  };
  