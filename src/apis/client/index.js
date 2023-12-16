import { apiFetch, getHeaders } from '..';

const URlClients = 'http://195.35.16.37:81/cashbycard/clients';

export const createClient = async (client) => {
  const apiOpts = {
    method: 'post',
    body: JSON.stringify(client),
    mode: 'no-cors',
    headers: getHeaders({ 'Content-Type': 'application/json' }),
  };
  const res = await apiFetch(URlClients, apiOpts);
  return res.json();
};

export const allClients = async () => {
  // const apiOpts = {
  //   method: 'get',
  //   headers: getHeaders({ 'Content-Type': 'application/json' }),

  // };
  // // eslint-disable-next-line no-debugger
  // debugger;
  // const res = await apiFetch('http://195.35.16.37:3000/clients', apiOpts);
  // const result = await res.json();
  // return result;
  const response = await fetch(URlClients);
  const result = await response.json();
  return result;
};

export const clientById = async (clientId) => {
  // const apiOpts = {
  //   method: 'get',
  //   headers: getHeaders({ 'Content-Type': 'application/json' }),
  // };
  // const res = await apiFetch(`/clients/${clientId}`, apiOpts);
  // return res.json();
  const ENDPOINT = `${URlClients}/${clientId}`;
  const response = await fetch(ENDPOINT);
  const result = await response.json();
  return result;
};

export const updateClient = async (client, clientId) => {
  const apiOpts = {
    method: 'put',
    body: JSON.stringify(client),
    headers: getHeaders({ 'Content-Type': 'application/json' }),
  };
  const res = await apiFetch(`${URlClients}/${clientId}`, apiOpts);
  return res.json();
};

export const deleteClient = async (clientId) => {
  const apiOpts = {
    method: 'delete',
    headers: getHeaders({ 'Content-Type': 'application/json' }),
    mode: 'no-cors',
  };
  const res = await apiFetch(`${URlClients}/${clientId}`, apiOpts);
  return res.json();
};
