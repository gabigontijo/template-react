import { apiFetch, getHeaders } from "..";

// const URlLoans = 'http://195.35.16.37:81/cashbycard/loans';
// const URlLoans = 'http://localhost/cashbycard/loans';
const URlLoans = '/cashbycard/loans';

export const createLoan = async (loan) => {
  const apiOpts = {
    method: 'post',
    body: JSON.stringify(loan),
    headers: getHeaders({ 'Content-Type': 'application/json' }),
  };
  const res = await apiFetch(URlLoans, apiOpts);
  return res.json();
};

export const allLoans = async () => {
  const apiOpts = {
    method: 'get',
    headers: getHeaders({ 'Content-Type': 'application/json' }),
  };
  const res = await apiFetch(URlLoans, apiOpts);
  return res.json();
};

export const loanById = async (loanId) => {
  const apiOpts = {
    method: 'get',
    headers: getHeaders({ 'Content-Type': 'application/json' }),
  };
  const res = await apiFetch(`${URlLoans}${loanId}`, apiOpts);
  return res.json();
};

export const updateLoan = async (loan) => {
  const apiOpts = {
    method: 'put',
    body: JSON.stringify(loan),
    headers: getHeaders({ 'Content-Type': 'application/json' }),
  };
  const res = await apiFetch(URlLoans, apiOpts);
  return res.json();
};

export const deleteLoan = async (loanId) => {
  const apiOpts = {
    method: 'delete',
    headers: getHeaders({ 'Content-Type': 'application/json' }),
  };
  const res = await apiFetch(`${URlLoans}${loanId}`, apiOpts);
  return res.json();
};


