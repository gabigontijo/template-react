import { useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import Autocomplete from '@mui/material/Autocomplete';

import { useAuth } from 'src/hooks/authProvider';

import { handleApiError } from 'src/utils/error-handle';

import { allPartners } from 'src/apis/partner';
import { createClient, updateClient, uploadClientFiles } from 'src/apis/client';

import MaskFields from '../common/mask-field';
import { clientInterface } from './view/type';
import SelectPixFields from '../common/input-select-pix';
import InputFileUpload from '../common/input-upload-file';

// ----------------------------------------------------------------------

export default function FormNewClient({
  setNewUser,
  setAlert,
  setAlertError,
  setMessage,
  clientId: resp,
  setClientId,
  refetchClients,
  stateClient,
  setStateClient,
  sxClient,
  clientDocuments,
}) {
  const [partnersList, setPartnersList] = useState([]);

  const auth = useAuth();

  useQuery('allPartners', allPartners, {
    onSuccess: (response) => {
      setPartnersList(response.Partners);
    },
    onError: (error) => {
    handleApiError(error, auth);
      console.error('Erro ao carregar Parceiros:', error);
    },
  });

  const handleSubmit = async () => {
    try {
      let respDocuments = '';
      if (stateClient.documents.length > 0) {
        respDocuments = await uploadClientFiles(stateClient.documents, stateClient.cpf);
      }
      const bodyClient = {
        name: stateClient.name,
        pixType: stateClient.pixType,
        pixKey: stateClient.pixKey,
        partnerId:stateClient.partner.id !== "" ? Number(stateClient.partner.id): null,
        phone: stateClient.phone,
        cpf: stateClient.cpf,
        documents: respDocuments,
      };
      await createClient(bodyClient);
      setAlert(true);
      setMessage('Cliente cadastrado com sucesso');
      setNewUser(false);
      setStateClient(clientInterface);
      refetchClients();
    } catch (error) {
      setAlertError(true);
      setMessage('Erro ao Cadastrar o cliente');
      handleApiError(error, auth);
    }
  };

  function getNewDocuments(arr) {
    const objetos = [];

    arr.forEach(elemento => {
        if (typeof elemento === 'object' && elemento !== null) {
            objetos.push(elemento);
        }
    });

    return objetos;
}

  const handleSubmitEdit = async () => {
    try {
      const newDocuments = getNewDocuments(stateClient.documents);
      let respDocuments = stateClient.documents
      if (newDocuments.length > 0){
        const response = await uploadClientFiles(stateClient.documents, stateClient.cpf);
        respDocuments = clientDocuments.concat(response)
      }
      const bodyClientEdit = {
        name: stateClient.name,
        pixType: stateClient.pixType,
        pixKey: stateClient.pixKey,
        partnerId: stateClient.partner.id !== "" ? Number(stateClient.partner.id): null,
        phone: stateClient.phone,
        cpf: stateClient.cpf,
        documents: respDocuments.join(','),
      };
      await updateClient(bodyClientEdit, resp);
      setNewUser(false);
      setClientId(null);
      setAlert(true);
      setMessage('Cliente editado com sucesso');
      setStateClient(clientInterface);
      refetchClients();
    } catch (error) {
      setAlertError(true);
      setMessage('Erro ao Editar o cliente');
      setNewUser(true);
      handleApiError(error, auth);
    }
  };

  const onPartnerSelect = (value) => {
    if (value && value.id) {
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
      <Stack spacing={{ xs: 1, sm: 2 }} sx={sxClient}>
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
        <Stack
          spacing={{ xs: 1, sm: 2 }}
          direction="row"
          useFlexGap
          sx={{
            flexWrap: {
              xs: 'wrap',
              sm: 'nowrap',
            },
          }}
        >
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

        <Stack
          spacing={{ xs: 1, sm: 2 }}
          direction="row"
          useFlexGap
          sx={{
            flexWrap: {
              xs: 'wrap',
              sm: 'nowrap',
            },
          }}
        >
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
        {resp === null && (
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            color="success"
            onClick={handleSubmit}
          >
            Cadastrar Cliente
          </LoadingButton>
        )}
        {resp !== null && (
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            color="inherit"
            onClick={handleSubmitEdit}
          >
            Editar Cliente
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
  setMessage: PropTypes.func,
  setClientId: PropTypes.func,
  clientId: PropTypes.any,
  refetchClients: PropTypes.func,
  stateClient: PropTypes.any,
  setStateClient: PropTypes.func,
  sxClient: PropTypes.object,
  clientDocuments: PropTypes.any,
};
