import { apiFetch } from '..';

// const URlClients = 'http://195.35.16.37:81/cashbycard/clients';
// const URlClients = 'http://localhost:3001/public/clients';
const URlClients = '/cashbycard/public/clients';

export const createClient = async (client) => {
  const apiOpts = {
    method: 'post',
    body: JSON.stringify(client),
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const res = await apiFetch(URlClients, apiOpts);
  return res.json();
};

export const allClients = async () => {
  const apiOpts = {
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
  };
  const res = await apiFetch(URlClients, apiOpts);
  return res.json();
  // const response = await fetch(URlClients);
  // const result = await response.json();
  // return result;
};

export const clientById = async (clientId) => {
  const apiOpts = {
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
  };
  const res = await apiFetch(`${URlClients}/${clientId}`, apiOpts);
  return res.json();
  // const ENDPOINT = `${URlClients}/${clientId}`;
  // const response = await fetch(ENDPOINT);
  // const result = await response.json();
  // return result;
};

export const updateClient = async (client, clientId) => {
  const apiOpts = {
    method: 'put',
    body: JSON.stringify(client),
    headers: { 'Content-Type': 'application/json' },
  };
  const res = await apiFetch(`${URlClients}/${clientId}`, apiOpts);
  return res.json();
};

export const deleteClient = async (clientId) => {
  const apiOpts = {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
  };
  const res = await apiFetch(`${URlClients}/${clientId}`, apiOpts);
  return res.json();
};

export const uploadClientFiles = async (files, cpf) => {
  const formData = new FormData();
  files.forEach((file, index) => {
    formData.append(`file${index}`, file);
  });

  const response = await fetch(`${URlClients}/files/${cpf}`, {
    method: 'POST',
    body: formData,
  });
  return response.json();
};
