import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';

import SelectPixFields from './input-select-pix';
import InputFileUpload from './input-upload-file';

// ----------------------------------------------------------------------

export default function FormNewUser({ setNewUser, setCloseAdd, setSendAlert }) {

  const handleSubmit = () => {
    setNewUser(false);
    setSendAlert(true);
    setCloseAdd(false);
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
            <TextField name="phone" label="Telefone" type="tel" fullWidth />
          </Box>
          <Box width="33%">
            <TextField name="CPF" label="CPF" type="text" fullWidth />
          </Box>
          <Box width="66%">
            <SelectPixFields />
          </Box>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Box width="33%">
            <TextField name="pixKey" label="Chave Pix" type="text" fullWidth />
          </Box>
          <Box width="33%">
            <TextField name="partner" label="Parceiro" type="text" fullWidth />
          </Box>
          <Box width="33%">
            <InputFileUpload />
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

FormNewUser.propTypes = {
  setNewUser: PropTypes.func,
  setCloseAdd: PropTypes.func,
  setSendAlert: PropTypes.func,
};
