import { apiFetch, getHeaders } from "..";

export const createPartner = async (client) => {
  const apiOpts = {
    method: 'post',
    body: JSON.stringify(client),
    headers: getHeaders({ 'Content-Type': 'application/json' }),
  };
  const res = await apiFetch('/clientes', apiOpts);
  return res.json();
};

export const allPartners = async () => {
  const apiOpts = {
    method: 'get',
    headers: getHeaders({ 'Content-Type': 'application/json' }),
  };
  const res = await apiFetch('/clientes', apiOpts);
  return res.json();
};

export const partnerById = async (clientId) => {
  const apiOpts = {
    method: 'get',
    headers: getHeaders({ 'Content-Type': 'application/json' }),
  };
  const res = await apiFetch(`/clientes/${clientId}`, apiOpts);
  return res.json();
};

export const updatePartner = async (client) => {
  const apiOpts = {
    method: 'put',
    body: JSON.stringify(client),
    headers: getHeaders({ 'Content-Type': 'application/json' }),
  };
  const res = await apiFetch(`/clientes`, apiOpts);
  return res.json();
};

export const deletePartner = async (clientId) => {
  const apiOpts = {
    method: 'delete',
    headers: getHeaders({ 'Content-Type': 'application/json' }),
  };
  const res = await apiFetch(`/clientes/${clientId}`, apiOpts);
  return res.json();
};


