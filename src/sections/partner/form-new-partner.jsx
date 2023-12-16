import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';

import { createPartner, updatePartner } from 'src/apis/partner';

import MaskFields from '../common/mask-field';
import { partnerInterface } from './view/type';
import SelectPixFields from '../common/input-select-pix';

// ----------------------------------------------------------------------

export default function FormNewPartner({
  setNewPartner,
  partnerId,
  setAlert,
  setAlertError,
  partnerToEdit,
  setMessageError,
  setMessageAlert,
                     
}) {
  const [state, setState] = useState(partnerToEdit || partnerInterface);

  const handleSubmit = async () => {
    try {
      const response = await createPartner(state);
      console.log('Resposta da API:', response);
      setNewPartner(false);
      setAlert(true);
      setMessageAlert('Parceiro cadastrado com sucesso')
    } catch (error) {
      setAlertError(true);
      setMessageError('Erro ao Cadastrar o parceiro')
      console.log('Erro ao Cadastrar o parceiro:', error);
    }
  };

  const handleSubmitEdit = async () => {
    try {
      const response = await updatePartner(partnerToEdit);
      console.log('Resposta da API:', response);
      setNewPartner(false);
      setAlert(true);
      setMessageAlert('Parceiro editado com sucesso')
    } catch (error) {
      setAlertError(true);
      setMessageError('Erro ao Editar o parceiro')
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
            <MaskFields
              mask="(99) 99999-9999"
              value={state.phone}
              handleChange={handleChange}
              name="phone"
              label="Telefone"
              type="text"
            />
          </Box>
          <Box width="33%">
            <MaskFields
              mask="999.999.999-99"
              name="cpf"
              label="CPF"
              type="text"
              value={state.cpf}
              handleChange={handleChange}
            />
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
        {partnerId === null && (
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
        {partnerId !== null && (
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
  partnerId:PropTypes.any,
  setAlert: PropTypes.func,
  setAlertError: PropTypes.func,
  partnerToEdit: PropTypes.any,
  setMessageError: PropTypes.any,
  setMessageAlert: PropTypes.any,
};
