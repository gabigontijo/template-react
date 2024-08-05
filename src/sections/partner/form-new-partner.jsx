import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';

import { useAuth } from 'src/hooks/authProvider';

import { handleApiError } from 'src/utils/error-handle';

import { createPartner, updatePartner } from 'src/apis/partner';

import MaskFields from '../common/mask-field';
import { partnerInterface } from './view/type';
import SelectPixFields from '../common/input-select-pix';

// ----------------------------------------------------------------------

export default function FormNewPartner({
  setNewPartner,
  partnerId,
  setPartnerId,
  setAlert,
  setAlertError,
  setMessage,
  refetchPartners,
  statePartner,
  setStatePartner,
  sxPartner,

}) {

  const auth = useAuth();

  const handleSubmit = async () => {
    try {
      const bodyParnter = {
        name: statePartner.name,
        email: statePartner.email,
        pixType: statePartner.pixType,
        pixKey: statePartner.pixKey,
        phone: statePartner.phone,
        cpf: statePartner.cpf,
        address: statePartner.address,
      };
      await createPartner(bodyParnter);
      setNewPartner(false);
      setAlert(true);
      setMessage('Parceiro cadastrado com sucesso')
      refetchPartners();
      setStatePartner(partnerInterface)
    } catch (error) {
      setAlertError(true);
      setMessage('Erro ao Cadastrar o parceiro')
      handleApiError(error, auth);
    }
  };

  const handleSubmitEdit = async () => {
    try {
      const nonEmptyState = Object.fromEntries(
        Object.entries(statePartner).map(([key, value]) => [key, value || ''])
      );
      const bodyPartnerEdit = {
        name: nonEmptyState.name,
        email: nonEmptyState.email,
        pixType: nonEmptyState.pixType,
        pixKey: nonEmptyState.pixKey,
        phone: nonEmptyState.phone,
        cpf: nonEmptyState.cpf,
        address: nonEmptyState.address,
      };
      await updatePartner(bodyPartnerEdit, partnerId);
      setNewPartner(false);
      setPartnerId(null);
      setAlert(true);
      setMessage('Parceiro editado com sucesso');
      setStatePartner(partnerInterface);
      refetchPartners();
    } catch (error) {
      setAlertError(true);
      setMessage('Erro ao Editar o parceiro')
      setNewPartner(true);
      handleApiError(error, auth);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setStatePartner({
      ...statePartner,
      [name]: value,
    });
  };

  return (
    <>
      <Stack spacing={{ xs: 1, sm: 2 }} sx={sxPartner}>
        <Stack direction="row" spacing={{ xs: 1, sm: 2 }}>
          <Box width="100%">
            <TextField
              name="name"
              label="Nome Completo"
              type="text"
              fullWidth
              value={statePartner.name}
              onChange={handleChange}
            />
          </Box>
        </Stack>
        <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap sx={{
          flexWrap: {
            xs: 'wrap',
            sm: 'nowrap',
          },
        }}>
          <Box width={{ xs: '100%', md: '30%' }}>
            <TextField
              name="email"
              label="Email"
              type="email"
              fullWidth
              value={statePartner.email}
              onChange={handleChange}
            />
          </Box>
          <Box width={{ xs: '100%', md: '30%' }}>
            <MaskFields
              mask="(99) 99999-9999"
              value={statePartner.phone}
              handleChange={handleChange}
              name="phone"
              label="Telefone"
              type="text"
            />
          </Box>
          <Box width={{ xs: '100%', md: '40%' }}>
            <MaskFields
              mask="999.999.999-99"
              name="cpf"
              label="CPF"
              type="text"
              value={statePartner.cpf}
              handleChange={handleChange}
            />
          </Box>
        </Stack>

        <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap sx={{
          flexWrap: {
            xs: 'wrap',
            sm: 'nowrap',
          },
        }}>
          <Box width={{ xs: '100%', md: '30%' }}>
            <SelectPixFields pixType={statePartner.pixType} handleChange={handleChange} />
          </Box>
          <Box width={{ xs: '100%', md: '30%' }}>
            <TextField
              name="pixKey"
              label="Chave Pix"
              type="text"
              fullWidth
              value={statePartner.pixKey}
              onChange={handleChange}
            />
          </Box>
          <Box width={{ xs: '100%', md: '40%' }}>
            <TextField
              name="address"
              label="Endereço"
              type="text"
              fullWidth
              value={statePartner.address}
              onChange={handleChange}
            />
          </Box>
        </Stack>
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 2 }}>
        {partnerId === null && (
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            color="success"
            onClick={handleSubmit}
          >
            Cadastrar Parceiro
          </LoadingButton>
        )}
        {partnerId !== null && (
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            color="inherit"
            onClick={handleSubmitEdit}
          >
            Editar Parceiro
          </LoadingButton>
        )}
      </Stack>
    </>
  );
}

FormNewPartner.propTypes = {
  setNewPartner: PropTypes.func,
  partnerId: PropTypes.any,
  setAlert: PropTypes.func,
  setAlertError: PropTypes.func,
  setPartnerId: PropTypes.any,
  setMessage: PropTypes.func,
  setStatePartner: PropTypes.func,
  statePartner: PropTypes.any,
  refetchPartners: PropTypes.func,
  sxPartner: PropTypes.object,
};
