import { apiFetch, getHeaders } from "..";

export const createPartner = async (partner) => {
  const apiOpts = {
    method: 'post',
    body: JSON.stringify(partner),
    headers: getHeaders({ 'Content-Type': 'application/json' }),
  };
  const res = await apiFetch('/partners', apiOpts);
  return res.json();
};

export const allPartners = async () => {
  const apiOpts = {
    method: 'get',
    headers: getHeaders({ 'Content-Type': 'application/json' }),
  };
  const res = await apiFetch('/partners', apiOpts);
  return res.json();
};

export const partnerById = async (partnerId) => {
  const apiOpts = {
    method: 'get',
    headers: getHeaders({ 'Content-Type': 'application/json' }),
  };
  const res = await apiFetch(`/partners/${partnerId}`, apiOpts);
  return res.json();
};

export const updatePartner = async (partner) => {
  const apiOpts = {
    method: 'put',
    body: JSON.stringify(partner),
    headers: getHeaders({ 'Content-Type': 'application/json' }),
  };
  const res = await apiFetch(`/partners`, apiOpts);
  return res.json();
};

export const deletePartner = async (partnerId) => {
  const apiOpts = {
    method: 'delete',
    headers: getHeaders({ 'Content-Type': 'application/json' }),
  };
  const res = await apiFetch(`/partners/${partnerId}`, apiOpts);
  return res.json();
};


