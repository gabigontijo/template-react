import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

import Iconify from 'src/components/iconify';

import FormNewPartner from '../partner/form-new-partner';

// ----------------------------------------------------------------------

export default function FormStepThree({
  setAlert,
  setAlertError,
  setMessageAlert,
  setMessageError,
  filterName,
  onFilterName,
  isNewPartner,
  setIsNewPartner,
  loan,
  setLoan,
  isLoading,
  partnerList,
  setPartnerList,

}) {
  const [checked, setChecked] = useState(false);
  const [, setSelectedPartner] = useState(null);

  const handleNewPartner = () => {
    setIsNewPartner(true);
  };

  const handleClosePartner = () => {
    setIsNewPartner(false);
  };

  const handleChecked = ({ target }) => {
    setChecked(target.checked);
  };

  const onPartnerSelect = (partner) => {
    setSelectedPartner(partner);
  };

  const handleChangePartnerValue = ({ target }) => {
    const calculatedPercentPartner = (parseFloat(target.value) / loan.value) * 100;

    setLoan((prevLoan) => ({
      ...prevLoan,
      partnerProfit: {
        ...prevLoan.partnerProfit,
        valuePartner: target.value,
        percentPartner: Number.isNaN(calculatedPercentPartner) ? '' : calculatedPercentPartner.toString(),
      },
    }));
  };

  const handleChangePartnerPercent = ({ target }) => {
    const calculatedValuePartner = (parseFloat(target.value) / 100) * loan.value;

    setLoan((prevLoan) => ({
      ...prevLoan,
      partnerProfit: {
        ...prevLoan.partnerProfit,
        valuePartner: Number.isNaN(calculatedValuePartner) ? '' : calculatedValuePartner.toString(),
        percentPartner: target.value,
      },
    }));
  };

  return (
    <Card sx={{ marginTop: '1.5em' }}>
      <Stack direction="row" spacing={1} p={3} alignItems="center">
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
          {isLoading && <Box sx={{ display: 'flex', justifyContent: 'center', mt: '1em' }}>
            <CircularProgress />
          </Box>}
          <Stack direction="row" spacing={4} p={3} alignItems="center">
            <Box width="90%">
              <Stack direction="row" justifyContent="flex-start" alignContent="center" spacing={3}>
                <Stack direction="row" justifyContent="flex-start" alignContent="center">
                  <Autocomplete
                    disablePortal
                    id="client-autocomplete"
                    options={partnerList}
                    getOptionLabel={(option) => option.name}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Procurar parceiro" />}
                    onChange={(event, value) => onPartnerSelect(value)}
                  />
                </Stack>
                <Box width="60%">
                  <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignContent="center"
                    spacing={3}
                  >
                    <TextField
                      name="valuePartner"
                      label="Valor da comissão"
                      type="number"
                      value={loan.partnerProfit.valuePartner}
                      onChange={handleChangePartnerValue}
                      fullWidth
                    />
                    <TextField
                      name="percentPartner"
                      label="Porcentagem da comissão"
                      type="number"
                      value={loan.partnerProfit.percentPartner}
                      onChange={handleChangePartnerPercent}
                      fullWidth
                    />
                  </Stack>
                </Box>
              </Stack>
            </Box>
            <Box width="20%">
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
              <FormNewPartner
                setNewPartner={setIsNewPartner}
                setAlert={setAlert}
                setMessageAlert={setMessageAlert}
                setAlertError={setAlertError}
                setMessageError={setMessageError}
              />
            </Box>
          )}
        </>
      )}
    </Card>
  );
}

FormStepThree.propTypes = {
  setAlert: PropTypes.func,
  setAlertError: PropTypes.func,
  setMessageError: PropTypes.func,
  setMessageAlert: PropTypes.func,
  isNewPartner: PropTypes.bool,
  setIsNewPartner: PropTypes.func,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  style: PropTypes.object,
  loan: PropTypes.any,
  setLoan: PropTypes.func,
  isLoading: PropTypes.func,
  setPartnerList: PropTypes.func,
  partnerList: PropTypes.any,
};
