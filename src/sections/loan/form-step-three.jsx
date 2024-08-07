import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

import Iconify from 'src/components/iconify';

import { partnerInterface } from '../partner/view/type';
import FormNewPartner from '../partner/form-new-partner';
import NumberFormatField from '../common/number-format-field';
import PercentFormatField from '../common/percent-format-field';

// ----------------------------------------------------------------------

export default function FormStepThree({
  setAlert,
  setAlertError,
  setMessage,
  isNewPartner,
  setIsNewPartner,
  loan,
  setLoan,
  isLoading,
  partnerList,
  refetchPartners,
}) {
  const [checked, setChecked] = useState(true);
  // const [, setSelectedPartner] = useState(null);

  const handleNewPartner = () => {
    setIsNewPartner(true);
    setLoan({
      ...loan,
      'partner': partnerInterface,
    });
  };

  const handleClosePartner = () => {
    setIsNewPartner(false);
  };

  const handleChecked = ({ target }) => {
    setChecked(target.checked);
  };

  const onPartnerSelect = (partner) => {
    setIsNewPartner(false);
    setLoan({
      ...loan,
      'partner': partner || partnerInterface,
    });
  };

  const handleChangePartnerValue = ({ target }) => {
    const calculatedPercentPartner = (parseFloat(target.value) / (loan.askValue * (parseFloat(loan.operationPercent))/100)) * 100;

    setLoan((prevLoan) => ({
      ...prevLoan,
        partnerAmount: target.value,
        partnerPercent: Number.isNaN(calculatedPercentPartner) ? '' : calculatedPercentPartner.toString(),
    }));
  };

  const handleChangePartnerPercent = ({ target }) => {
    const calculatedValuePartner = (parseFloat(target.value) / 100) * (loan.askValue * (parseFloat(loan.operationPercent))/100);

    setLoan((prevLoan) => ({
      ...prevLoan,
        partnerAmount: Number.isNaN(calculatedValuePartner) ? '' : calculatedValuePartner.toString(),
        partnerPercent: target.value,
    }));
  };

  const setPartner = (partner) => {
    setLoan({
      ...loan,
      'partner': partner,
    });
  }

  return (
    <Card sx={{ marginTop: '1.5em' }}>
      <Stack direction="row" spacing={1} p={3} alignItems="center">
        <Typography>Não</Typography>
        <Switch
          {...{ inputProps: { 'aria-label': 'Switch demo' } }}
          checked={checked}
          onChange={handleChecked}
        />
        <Typography>Sim</Typography>
      </Stack>
      {checked && (
        <>
          {isLoading && <Box sx={{ display: 'flex', justifyContent: 'center', mt: '1em' }}>
            <CircularProgress />
          </Box>}
          <Stack direction="row" p={2} alignItems="center" spacing={{ xs: 2, sm: 2 }} useFlexGap sx={{
            flexWrap: {
              xs: 'wrap',
              sm: 'nowrap',
            },
          }}>
            <Box width={{ xs: '80%', md: '60%' }} direction= "row">
              <Autocomplete
                id="partner-autocomplete"
                options={partnerList}
                getOptionLabel={(option) => option.name}
                value={partnerList.find((partner) => partner.id === loan.partner.id) || null}
                renderInput={(params) => <TextField {...params} label="Procurar parceiro" />}
                onChange={(event, value) => onPartnerSelect(value)}
              />
            </Box>
            <Box>
            {!isNewPartner ? (
                  <Tooltip title="Novo Parceiro">
                  <IconButton aria-label="delete" onClick={handleNewPartner} size="large" color="primary" >
                   <Iconify icon="bx:user-plus" />
                </IconButton>
                </Tooltip>
                ) : (
                  <Button color="inherit" onClick={handleClosePartner}>
                    <CloseIcon />
                  </Button>
                )}
            
            </Box>

            <Box width={{ xs: '100%', md: '60%' }}>
              <NumberFormatField
                name="valuePartner"
                label="Valor da comissão"
                value={loan.partnerAmount}
                handleChange={handleChangePartnerValue}
              />
            </Box>
            <Box width={{ xs: '100%', md: '60%' }}>
              <PercentFormatField
                name="percentPartner"
                label="Porcentagem da comissão"
                value={loan.partnerPercent }
                handleChange={handleChangePartnerPercent} />
            </Box>
          </Stack>
          {isNewPartner && (
            <Box sx={{ margin: 3 }}>
              <FormNewPartner
                setNewPartner={setIsNewPartner}
                setAlert={setAlert}
                setAlertError={setAlertError}
                setMessage={setMessage}
                partnerId={null}
                refetchPartners={refetchPartners}
                statePartner={loan.partner}
                setStatePartner={setPartner}
                sxPartner={{ padding: '1.5em', backgroundColor: 'rgba(145, 158, 171, 0.12)' }}
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
  setMessage: PropTypes.func,
  isNewPartner: PropTypes.bool,
  setIsNewPartner: PropTypes.func,
  style: PropTypes.object,
  loan: PropTypes.any,
  setLoan: PropTypes.func,
  isLoading: PropTypes.bool,
  partnerList: PropTypes.any,
  refetchPartners: PropTypes.func
};
