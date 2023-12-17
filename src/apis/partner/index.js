import { apiFetch, getHeaders } from "..";

// const URlPartners = 'http://195.35.16.37:81/cashbycard/partners'
// const URlPartners = 'http://localhost/cashbycard/partners';
const URlPartners = '/cashbycard/partners'

export const createPartner = async (partner) => {
  const apiOpts = {
    method: 'post',
    body: JSON.stringify(partner),
    headers: getHeaders({ 'Content-Type': 'application/json' }),
  };
  const res = await apiFetch(URlPartners, apiOpts);
  return res.json();
};

export const allPartners = async () => {
  // const apiOpts = {
  //   method: 'get',
  //   headers: getHeaders({ 'Content-Type': 'application/json' }),
  // };
  // const res = await apiFetch(URlPartners, apiOpts);
  // return res.json();
  const response = await fetch(URlPartners);
  const result = await response.json();
  return result;
};

export const partnerById = async (partnerId) => {
  const apiOpts = {
    method: 'get',
    headers: getHeaders({ 'Content-Type': 'application/json' }),
  };
  const res = await apiFetch(`${URlPartners}/${partnerId}`, apiOpts);
  return res.json();
};

export const updatePartner = async (partner, partnerId) => {
  const apiOpts = {
    method: 'put',
    body: JSON.stringify(partner),
    headers: getHeaders({ 'Content-Type': 'application/json' }),
  };
  const res = await apiFetch(`${URlPartners}/${partnerId}`, apiOpts);
  return res.json();
};

export const deletePartner = async (partnerId) => {
  const apiOpts = {
    method: 'delete',
    headers: getHeaders({ 'Content-Type': 'application/json' }),
  };
  const res = await apiFetch(`${URlPartners}/${partnerId}`, apiOpts);
  return res.json();
};


