import { apiFetch, getHeaders } from "..";

export const createLoan = async (loan) => {
  const apiOpts = {
    method: 'post',
    body: JSON.stringify(loan),
    headers: getHeaders({ 'Content-Type': 'application/json' }),
  };
  const res = await apiFetch('/loans', apiOpts);
  return res.json();
};

export const allLoans = async () => {
  const apiOpts = {
    method: 'get',
    headers: getHeaders({ 'Content-Type': 'application/json' }),
  };
  const res = await apiFetch('/loans', apiOpts);
  return res.json();
};

export const loanById = async (loanId) => {
  const apiOpts = {
    method: 'get',
    headers: getHeaders({ 'Content-Type': 'application/json' }),
  };
  const res = await apiFetch(`/loans/${loanId}`, apiOpts);
  return res.json();
};

export const updateLoan = async (loan) => {
  const apiOpts = {
    method: 'put',
    body: JSON.stringify(loan),
    headers: getHeaders({ 'Content-Type': 'application/json' }),
  };
  const res = await apiFetch(`/loans`, apiOpts);
  return res.json();
};

export const deleteLoan = async (loanId) => {
  const apiOpts = {
    method: 'delete',
    headers: getHeaders({ 'Content-Type': 'application/json' }),
  };
  const res = await apiFetch(`/loans/${loanId}`, apiOpts);
  return res.json();
};


