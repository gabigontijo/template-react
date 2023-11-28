import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';

import SelectPixFields from '../user/input-select-pix';

// ----------------------------------------------------------------------

export default function FormNewPartner({ setNewPartner, setSendAlert }) {
  const handleSubmit = () => {
    setNewPartner(false);
    setSendAlert(true);
  };
  return (
    <>
      <Stack spacing={2}>
        <Stack direction="row" spacing={2}>
          <Box width="100%">
            <TextField name="name" label="Nome Completo" type="text" fullWidth />
          </Box>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Box width="33%">
            <TextField name="email" label="Email" type="email" fullWidth />
          </Box>
          <Box width="33%">
            <TextField name="phone" label="Telefone" type="tel" fullWidth />
          </Box>
          <Box width="33%">
            <TextField name="CPF" label="CPF" type="text" fullWidth />
          </Box>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Box width="33%">
            <SelectPixFields />
          </Box>
          <Box width="33%">
            <TextField name="pixKey" label="Chave Pix" type="text" fullWidth />
          </Box>
          <Box width="66%">
            <TextField name="adress" label="Endereço" type="text" fullWidth />
          </Box>
        </Stack>
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 2 }}>
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          color="success"
          onClick={handleSubmit}
        >
          Cadastrar
        </LoadingButton>
      </Stack>
      
    </>
  );
}

FormNewPartner.propTypes = {
  setNewPartner: PropTypes.func,
  setSendAlert: PropTypes.func,
};
