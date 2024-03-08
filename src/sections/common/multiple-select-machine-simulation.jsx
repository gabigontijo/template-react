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

export default function MultipleSelectMachineSimulation({selectedMachines, machineList, onChange}) {

   return (
      <FormControl fullWidth>
        <InputLabel id="multiple-checkbox-machine">Selecione a Maquininha</InputLabel>
        <Select
          labelId="multiple-checkbox-machine"
          id="checkbox-machine"
          multiple
          value={selectedMachines}
          onChange={onChange}
          input={<OutlinedInput label="Selecione a Maquininha" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {machineList.map((machine) => (
            <MenuItem key={machine.id} value={machine.name}>
              <Checkbox checked={selectedMachines.indexOf(machine.name) > -1} />
              <ListItemText primary={machine.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
  );
}

MultipleSelectMachineSimulation.propTypes = {
    onChange: PropTypes.func,
    selectedMachines: PropTypes.any,
    machineList: PropTypes.any,
  };
  