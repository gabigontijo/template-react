import { useState } from 'react';
import PropTypes from 'prop-types';
import InputMask from 'react-input-mask';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';

import { createPartner, updatePartner } from 'src/apis/partner';

import { partnerInterface } from './view/type';
import SelectPixFields from '../client/input-select-pix';

// ----------------------------------------------------------------------

export default function FormNewPartner({
  setNewPartner,
  setAlert,
  setAlertError,
  partnerToEdit,
  setAlertEdit,
}) {
  const [state, setState] = useState(partnerToEdit || partnerInterface);

  const handleSubmit = async () => {
    try {
      const response = await createPartner(state);
      console.log('Resposta da API:', response);
      setNewPartner(false);
      setAlert(true);
    } catch (error) {
      setAlertError(true);
      console.log('Erro ao Cadastrar o parceiro:', error);
    }
  };

  const handleSubmitEdit = async () => {
    try {
      const response = await updatePartner(partnerToEdit);
      console.log('Resposta da API:', response);
      setNewPartner(false);
    } catch (error) {
      setAlertEdit(true);
      // setAlertError(true);
      console.log('Erro ao Editar o parceiro:', error);
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
              fullWidth
              value={state.name}
              onChange={handleChange}
            />
          </Box>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Box width="33%">
            <TextField
              name="email"
              label="Email"
              type="email"
              fullWidth
              value={state.email}
              onChange={handleChange}
            />
          </Box>
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
        </Stack>

        <Stack direction="row" spacing={2}>
          <Box width="33%">
            <SelectPixFields pixType={state.pixType} handleChange={handleChange} />
          </Box>
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
          <Box width="66%">
            <TextField
              name="adress"
              label="Endereço"
              type="text"
              fullWidth
              value={state.adress}
              onChange={handleChange}
            />
          </Box>
        </Stack>
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 2 }}>
        {partnerToEdit.id == null && (
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
        {partnerToEdit.id != null && (
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

FormNewPartner.propTypes = {
  setNewPartner: PropTypes.func,
  setAlert: PropTypes.func,
  setAlertError: PropTypes.func,
  partnerToEdit: PropTypes.any,
  setAlertEdit: PropTypes.func,
};
