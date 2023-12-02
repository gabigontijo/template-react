import { apiFetch, getHeaders } from "..";

export const createClient = async (client) => {
  const apiOpts = {
    method: 'post',
    body: JSON.stringify(client),
    headers: getHeaders({ 'Content-Type': 'application/json' }),
  };
  const res = await apiFetch('/clientes', apiOpts);
  return res.json();
};

export const allClients = async () => {
  const apiOpts = {
    method: 'get',
    headers: getHeaders({ 'Content-Type': 'application/json' }),
  };
  const res = await apiFetch('/clientes', apiOpts);
  return res.json();
};

export const clientById = async (clientId) => {
  const apiOpts = {
    method: 'get',
    headers: getHeaders({ 'Content-Type': 'application/json' }),
  };
  const res = await apiFetch(`/clientes/${clientId}`, apiOpts);
  return res.json();
};

export const updateClient = async (client) => {
  const apiOpts = {
    method: 'put',
    body: JSON.stringify(client),
    headers: getHeaders({ 'Content-Type': 'application/json' }),
  };
  const res = await apiFetch(`/clientes`, apiOpts);
  return res.json();
};

export const deleteClient = async (clientId) => {
  const apiOpts = {
    method: 'delete',
    headers: getHeaders({ 'Content-Type': 'application/json' }),
  };
  const res = await apiFetch(`/clientes/${clientId}`, apiOpts);
  return res.json();
};


