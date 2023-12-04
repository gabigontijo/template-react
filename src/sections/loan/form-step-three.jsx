import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

import Iconify from 'src/components/iconify';

import FormNewPartner from '../partner/form-new-partner';

// ----------------------------------------------------------------------

export default function FormStepThree({
  setSendAlert,
  filterName,
  onFilterName,
  isNewPartner,
  setIsNewPartner,
  // setCloseAdd,
}) {
  const [checked, setChecked] = useState(false);

  const handleNewPartner = () => {
    setIsNewPartner(true);
  };

  const handleClosePartner = () => {
    setIsNewPartner(false);
  };

  const handleChecked = ({ target }) => {
    setChecked(target.checked);
  };

  return (
    <Card sx={{ marginTop: '1.5em' }}>
      <Stack direction="row" spacing={1} p={3}  alignItems="center">
        <Typography>Off</Typography>
        <Switch
          {...{ inputProps: { 'aria-label': 'Switch demo' } }}
          checked={checked}
          onChange={handleChecked}
        />
        <Typography>On</Typography>
      </Stack>
      {checked && (
        <>
          <Stack direction="row" spacing={3} p={3} pt={0} alignItems="center">
            <Box width="50%">
              <Stack direction="row" justifyContent="flex-start" alignContent="center">
                <OutlinedInput
                  value={filterName}
                  onChange={onFilterName}
                  placeholder="Procurar parceiro..."
                  startAdornment={
                    <InputAdornment position="start">
                      <Iconify
                        icon="eva:search-fill"
                        sx={{ color: 'text.disabled', width: 70, height: 20 }}
                      />
                    </InputAdornment>
                  }
                />
              </Stack>
            </Box>
            <Box width="50%">
              <Stack direction="row" justifyContent="flex-end" alignItems="center">
                {!isNewPartner ? (
                  <Button
                    variant="contained"
                    color="success"
                    startIcon={<Iconify icon="eva:plus-fill" />}
                    onClick={handleNewPartner}
                  >
                    Novo Parceiro
                  </Button>
                ) : (
                  <Button color="inherit" onClick={handleClosePartner}>
                    <CloseIcon />
                  </Button>
                )}
              </Stack>
            </Box>
          </Stack>
          {isNewPartner && (
            <Box sx={{ margin: 3 }}>
              <FormNewPartner setNewPartner={setIsNewPartner} setAlert={setSendAlert}/>
            </Box>
          )}
        </>
      )}
    </Card>
  );
}

FormStepThree.propTypes = {
  setSendAlert: PropTypes.func,
  isNewPartner: PropTypes.bool,
  setIsNewPartner: PropTypes.func,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};
