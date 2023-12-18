import { useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from "react-query";
import { useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import Autocomplete from '@mui/material/Autocomplete';

import { allPartners } from 'src/apis/partner';
import { createClient, updateClient } from 'src/apis/client';

import MaskFields from '../common/mask-field';
import SelectPixFields from '../common/input-select-pix';
import InputFileUpload from '../common/input-upload-file';
import { clientInterface } from './view/type';

// ----------------------------------------------------------------------

export default function FormNewClient({
  setNewUser,
  setAlert,
  setAlertError,
  setClientName,
  setNextStep,
  setMessageError,
  setMessageAlert,
  clientId,
  setClientId,
  refetchClients,
  stateClient,
  setStateClient
}) {
  const [partnersList, setPartnersList] = useState([]);
  const location = useLocation();

  useQuery("allPartners", allPartners, {
    onSuccess: (response) => {
      setPartnersList(response.Partners);
    },
    onError: (error) => {
      console.error('Erro ao carregar clientes:', error);
    }
  });

  const handleSubmit = async () => {
    try {
      const bodyClient = {
        name: stateClient.name,
        pixType: stateClient.pixType,
        pixKey: stateClient.pixKey,
        partnerId: Number(stateClient.partner.id),
        phone: stateClient.phone,
        cpf: stateClient.cpf,
        documents: '',
      };
      const response = await createClient(bodyClient);
      if (location.pathname === '/emprestimo') {
        setClientName(response.name);
        setNextStep(true);
      }
      setNewUser(false);

      setAlert(true);
      setMessageAlert('Cliente cadastrado com sucesso');
      refetchClients();
      setStateClient(clientInterface)
    } catch (error) {
      // eslint-disable-next-line no-debugger
      debugger;
      setAlertError(true);
      setMessageError('Erro ao Cadastrar o cliente');
      console.log('Erro ao Cadastrar o cliente:', error);
    }
  };

  const handleSubmitEdit = async () => {
    try {
      // eslint-disable-next-line no-debugger
      debugger;
      const nonEmptyState = Object.fromEntries(
        Object.entries(stateClient).map(([key, value]) => [key, value || ''])
      );
      const bodyClientEdit = {
        name: nonEmptyState.name,
        pixType: nonEmptyState.pixType,
        pixKey: nonEmptyState.pixKey,
        partnerId: Number(nonEmptyState.partner.id),
        phone: nonEmptyState.phone,
        cpf: nonEmptyState.cpf,
        documents: '',
      };
      const response = await updateClient(bodyClientEdit, clientId);
      console.log('Resposta da API:', response);
      setNewUser(false);
      setClientId(null);
      setAlert(true);
      setMessageAlert('Cliente editado com sucesso');
      setStateClient(clientInterface)
      refetchClients();
    } catch (error) {
      setAlertError(true);
      setMessageError('Erro ao Editar o cliente');
      setNewUser(true);
      console.log('Erro ao Editar o cliente:', error);
    }
  };

  const onPartnerSelect = (value) => {
    if (value && value.id) {
      console.log('valuePartner-----------------------', value);
      setStateClient({
        ...stateClient,
        partner: {
          ...stateClient.partner,
          id: value.id,
        },
      });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setStateClient({
      ...stateClient,
      [name]: value,
    });
  };

  return (
    <>
      <Stack spacing={{ xs: 1, sm: 2 }}>
        <Stack direction="row" spacing={{ xs: 1, sm: 2 }}>
          <Box width="100%">
            <TextField
              name="name"
              label="Nome Completo"
              type="text"
              value={stateClient.name}
              onChange={handleChange}
              fullWidth
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
            <MaskFields
              mask="(99) 99999-9999"
              name="phone"
              label="Telefone"
              type="text"
              value={stateClient.phone}
              handleChange={handleChange}
            />
          </Box>
          <Box width={{ xs: '100%', md: '30%' }}>
            <MaskFields
              mask="999.999.999-99"
              name="cpf"
              label="CPF"
              type="text"
              value={stateClient.cpf}
              handleChange={handleChange}
            />
          </Box>
          <Box width={{ xs: '100%', md: '40%' }}>
            <SelectPixFields pixType={stateClient.pixType} handleChange={handleChange} />
          </Box>
        </Stack>

        <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap sx={{
          flexWrap: {
            xs: 'wrap',
            sm: 'nowrap',
          },
        }}>
          <Box width={{ xs: '100%', md: '25%' }}>
            <TextField
              name="pixKey"
              label="Chave Pix"
              type="text"
              value={stateClient.pixKey}
              onChange={handleChange}
              fullWidth
            />
          </Box>
          <Box width={{ xs: '100%', md: '40%' }}>
            <Autocomplete
              disablePortal
              id="client-autocomplete"
              options={partnersList}
              getOptionLabel={(option) => option.name}
              sx={{ width: '100%' }}
              value={partnersList.find((partner) => partner.id === stateClient.partner.id) || null}
              renderInput={(params) => <TextField {...params} label="Procurar parceiro" />}
              onChange={(event, value) => onPartnerSelect(value)}
            />
          </Box>
          <Box width={{ xs: '100%', md: '33%' }}>
            <InputFileUpload setState={setStateClient} uploadedDocuments={stateClient.documents} />
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
  setNextStep: PropTypes.func,
  setClientName: PropTypes.func,
  setMessageError: PropTypes.func,
  setMessageAlert: PropTypes.func,
  setClientId: PropTypes.func,
  clientId: PropTypes.any,
  refetchClients: PropTypes.func,
  stateClient: PropTypes.any,
  setStateClient: PropTypes.func
};
