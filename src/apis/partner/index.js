import { apiFetch } from "..";

// const URlPartners = 'http://195.35.16.37:81/cashbycard/partners'
// const URlPartners = 'http://localhost:3001/partners';
const URlPartners = '/cashbycard/public/partners'

export const createPartner = async (partner) => {
  const apiOpts = {
    method: 'post',
    body: JSON.stringify(partner),
    headers:{ 'Content-Type': 'application/json' },
  };
  const res = await apiFetch(URlPartners, apiOpts);
  return res.json();
};

export const allPartners = async () => {
  const apiOpts = {
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
  };
  const res = await apiFetch(URlPartners, apiOpts);
  return res.json();
};

export const partnerById = async (partnerId) => {
  const apiOpts = {
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
  };
  const res = await apiFetch(`${URlPartners}/${partnerId}`, apiOpts);
  return res.json();
};

export const updatePartner = async (partner, partnerId, navigate) => {
  const apiOpts = {
    method: 'put',
    body: JSON.stringify(partner),
    headers: { 'Content-Type': 'application/json' },
  };
  const res = await apiFetch(`${URlPartners}/${partnerId}`, apiOpts);
  return res.json();
};

export const deletePartner = async (partnerId) => {
  const apiOpts = {
    method: 'delete',
    headers:{ 'Content-Type': 'application/json' },
  };
  const res = await apiFetch(`${URlPartners}/${partnerId}`, apiOpts);
  return res.json();
};


