import { useState } from 'react';
import PropTypes from 'prop-types';
import InputMask from 'react-input-mask';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';

import { createClient, updateClient } from 'src/apis/client';

import { clientInterface } from './view/type';
import SelectPixFields from './input-select-pix';
import InputFileUpload from './input-upload-file';

// ----------------------------------------------------------------------

export default function FormNewClient({ setNewUser, setAlert, setAlertError, clientToEdit, setAlertEdit }) {
  const [state, setState] = useState(clientToEdit || clientInterface);

  const handleSubmit = async () => {
    try {
      const response = await createClient(state);
      console.log('Resposta da API:', response);
      setNewUser(false);
      setAlert(true);
    } catch (error) {
      setAlertError(true);
      console.log('Erro ao Cadastrar o cliente:', error);
    }
  };

  const handleSubmitEdit = async () => {
    try {
      const response = await updateClient(clientToEdit);
      console.log('Resposta da API:', response);
      setNewUser(false);
    } catch (error) {
      setAlertEdit(true);
      // setAlertError(true);
      console.log('Erro ao Editar o cliente:', error);
    }
  };  

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value,
    });
    console.log(value);
  };

  return (
    <>
      <Stack spacing={2}>
        <Stack direction="row" spacing={2}>
          <Box width="100%">
            <TextField
              name="name"
              label="Nome Completo"
              type="text"
              value={state.name}
              onChange={handleChange}
              fullWidth
            />
          </Box>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Box width="33%">
            <InputMask
              mask="(99) 99999-9999"
              value={state.phone}
              onChange={(event) =>
                handleChange({ target: { name: 'phone', value: event.target.value } })
              }
            >
              {(inputProps) => (
                <TextField {...inputProps} name="phone" label="Telefone" type="text" fullWidth />
              )}
            </InputMask>
          </Box>
          <Box width="33%">
            <InputMask
              mask="999.999.999-99"
              value={state.cpf}
              onChange={(event) =>
                handleChange({ target: { name: 'cpf', value: event.target.value } })
              }
            >
              {(inputProps) => (
                <TextField {...inputProps} name="cpf" label="CPF" type="text" fullWidth />
              )}
            </InputMask>
          </Box>
          <Box width="66%">
            <SelectPixFields pixType={state.pixType} handleChange={handleChange} />
          </Box>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Box width="33%">
            <TextField
              name="pixKey"
              label="Chave Pix"
              type="text"
              fullWidth
              value={state.pixKey}
              onChange={handleChange}
            />
          </Box>
          <Box width="33%">
            <TextField
              name="partner"
              label="Parceiro"
              type="text"
              fullWidth
              value={state.partner}
              onChange={handleChange}
            />
          </Box>
          <Box width="33%">
            <InputFileUpload />
          </Box>
        </Stack>
      </Stack>
      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 2 }}>
        {clientToEdit.id == null && (
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
        )}
        {clientToEdit.id != null && (
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            color="inherit"
            onClick={handleSubmitEdit}
          >
            Editar
          </LoadingButton>
        )}
      </Stack>
    </>
  );
}

FormNewClient.propTypes = {
  setNewUser: PropTypes.func,
  setAlert: PropTypes.func,
  setAlertError: PropTypes.func,
  clientToEdit: PropTypes.any,
  setAlertEdit:  PropTypes.func,
};
