import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import Autocomplete from '@mui/material/Autocomplete';

import { allPartners } from 'src/apis/partner';
import { createClient, updateClient } from 'src/apis/client';

import { clientInterface } from './view/type';
import MaskFields from '../common/mask-field';
import SelectPixFields from '../common/input-select-pix';
import InputFileUpload from '../common/input-upload-file';

// ----------------------------------------------------------------------

export default function FormNewClient({
  setNewUser,
  setAlert,
  setAlertError,
  clientToEdit,
  setClientName,
  setNextStep,
  setMessageError,
  setMessageAlert,
  clientId,
  setClientId,
}) {
  const [state, setState] = useState(clientToEdit || clientInterface);
  const [partnersList, setPartnersList] = useState([]);
  const location = useLocation();

  useEffect(() => {
    console.log(state.pixType);
    const loadAllPartners = async () => {
      try {
        const partners = await allPartners();
        setPartnersList(partners);
      } catch (error) {
        console.log('Erro ao carregar parceiros', error);
      }
    };
    loadAllPartners();
  }, [state.pixType]);

  const handleSubmit = async () => {
    try {
      const bodyClient = {
        name: state.name,
        pixType: state.pixType,
        pixKey: state.pixKey,
        partnerId: Number(state.partner.id),
        phone: state.phone,
        cpf: state.cpf,
        documenst: state.documenst,
      };
      const response = await createClient(bodyClient);
      console.log('Resposta da API:', response);
      if (location.pathname === '/emprestimo') {
        setClientName(response.name);
        setNextStep(true);
      }
      setNewUser(false);
      setAlert(true);
      setMessageAlert('cliente cadastrado com sucesso');
    } catch (error) {
      setAlertError(true);
      setMessageError('Erro ao Cadastrar o cliente');
      console.log('Erro ao Cadastrar o cliente:', error);
    }
  };

  const handleSubmitEdit = async () => {
    try {
      const bodyClientEdit = {
        name: clientToEdit.name,
        pixType: clientToEdit.pixType,
        pixKey: clientToEdit.pixKey,
        partnerId: Number(clientToEdit.partner.id),
        phone: clientToEdit.phone,
        cpf: clientToEdit.cpf,
        documenst: clientToEdit.documenst,
      };
      const response = await updateClient(bodyClientEdit, clientId);
      console.log('Resposta da API:', response);
      setNewUser(false);
      setClientId(null);
    } catch (error) {
      setAlertError(true);
      setMessageError('Erro ao Editar o cliente');
      setClientId(null);
      console.log('Erro ao Editar o cliente:', error);
    }
  };

  const onPartnerSelect = (value) => {
    setState({
      ...state,
      partner: {
        ...state.partner,
        id: value,
      },
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    // const numericValue = value.replace(/\D/g, '');
    // const x = numericValue.match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    // const maskedValue = !x[2] ? x[1] : `(${x[1]}) ${x[2]}${x[3] ? `-${x[3]}` : ''}`;
    setState({
      ...state,
      [name]: value,
    });
  };

  // const handleChangePartnerId = (event) => {
  //   const { value } = event.target;
  //   setState({
  //     ...state,
  //     partner: {
  //       ...state.partner,
  //       id: value,
  //     },
  //   });
  // };

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
            <MaskFields
              mask="(99) 99999-9999"
              name="phone"
              label="Telefone"
              type="text"
              value={state.phone}
              handleChange={handleChange}
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
              value={state.pixKey}
              onChange={handleChange}
              fullWidth
            />
          </Box>
          <Box width="33%">
            <Autocomplete
                    disablePortal
                    id="client-autocomplete"
                    options={partnersList}
                    getOptionLabel={(option) => option.name}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Procurar parceiro" />}
                    onChange={(event, value) => onPartnerSelect(value)}
                  />
            {/* <TextField
              name="partner"
              label="Parceiro"
              type="text"
              value={state.partner.id}
              onChange={handleChangePartnerId}
              fullWidth
            /> */}
          </Box>
          <Box width="33%">
            <InputFileUpload setState={setState} uploadedDocuments={state.documents} />
          </Box>
        </Stack>
      </Stack>
      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 2 }}>
        {clientId === null && (
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
        {clientId !== null && (
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
  setNextStep: PropTypes.func,
  setClientName: PropTypes.func,
  setMessageError: PropTypes.func,
  setMessageAlert: PropTypes.func,
  setClientId: PropTypes.func,
  clientId: PropTypes.any,
};
