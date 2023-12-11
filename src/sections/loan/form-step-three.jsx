import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';

import Iconify from 'src/components/iconify';

import FormNewPartner from '../partner/form-new-partner';
import { allPartners } from 'src/apis/partner';

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
  const [partnersList, setPartnersList] = useState([]);
  const [filteredClients, setFilteredPartners] = useState([]);
  const [selectedPartner, setSelectedPartner] = useState(null);

  useEffect(() => {
    const loadAllPartners = async () => {
      try {
        const clients = await allPartners();
        setPartnersList(clients);
        setFilteredPartners(clients);
      } catch (error) {
        console.log('Erro ao carregar clientes', error);
      }
    };
    loadAllPartners();
  }, []);

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
          <Stack direction="row" spacing={4} p={3} alignItems="center">
            <Box width="90%">
              <Stack direction="row" justifyContent="flex-start" alignContent="center" spacing={3}>
                <Stack direction="row" justifyContent="flex-start" alignContent="center">
                  <Autocomplete
                    disablePortal
                    id="client-autocomplete"
                    options={partnersList}
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
                      // value={state.pixKey}
                      // onChange={handleChange}
                      fullWidth
                    />
                    <TextField
                      name="percentPartner"
                      label="Porcentagem da comissão"
                      type="number"
                      // value={state.pixKey}
                      // onChange={handleChange}
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
              <FormNewPartner setNewPartner={setIsNewPartner} setAlert={setSendAlert} />
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
  style: PropTypes.object,
};
