import axios from 'axios';
import { apiFetch, getHeaders } from "..";

// export const createClient = async (client) => {
//   const apiOpts = {
//     method: 'post',
//     body: JSON.stringify(client),
//     headers: getHeaders({ 'Content-Type': 'application/json' }),
//   };
//   const res = await apiFetch('http://195.35.16.37:3000/clients', apiOpts);
//   return res.json();
// };

export const createClient = async (client) => {
  const apiOpts = {
    method: 'post',
    data: client, // Axios irá serializar automaticamente o objeto JSON
    headers: {
      'Content-Type': 'application/json',
      // Adicione quaisquer outros cabeçalhos necessários aqui
    },
  };

  try {
    const res = await axios.post('http://195.35.16.37:3000/clients', apiOpts);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const allClients = async () => {
  const apiOpts = {
    method: 'get',
    headers: getHeaders({ 'Content-Type': 'application/json' }),
  };
  const res = await apiFetch('195.35.16.37:3000/clients', apiOpts);
  return res.json();
};

export const clientById = async (clientId) => {
  const apiOpts = {
    method: 'get',
    headers: getHeaders({ 'Content-Type': 'application/json' }),
  };
  const res = await apiFetch(`/clients/${clientId}`, apiOpts);
  return res.json();
};

export const updateClient = async (client) => {
  const apiOpts = {
    method: 'put',
    body: JSON.stringify(client),
    headers: getHeaders({ 'Content-Type': 'application/json' }),
  };
  const res = await apiFetch(`/clients`, apiOpts);
  return res.json();
};

export const deleteClient = async (clientId) => {
  const apiOpts = {
    method: 'delete',
    headers: getHeaders({ 'Content-Type': 'application/json' }),
  };
  const res = await apiFetch(`/clients/${clientId}`, apiOpts);
  return res.json();
};


