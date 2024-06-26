import { apiFetch } from "..";

// const URlLoans = 'http://195.35.16.37:81/cashbycard/loans';
// const URlLoans = 'http://localhost:3001/loans';
const URlLoans = '/cashbycard/admin/loans';

export const createLoan = async (loan) => {
  const apiOpts = {
    method: 'post',
    body: JSON.stringify(loan),
    headers: { 'Content-Type': 'application/json' },
  };
  const res = await apiFetch(URlLoans, apiOpts);
  return res.json();
};

export const allLoans = async () => {
  const apiOpts = {
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
  };
  const res = await apiFetch(URlLoans, apiOpts);
  return res.json();
};

export const loanById = async (loanId) => {
  const apiOpts = {
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
  };
  const res = await apiFetch( `${URlLoans}/${loanId}`, apiOpts);
  return res.json();
};

export const updateLoan = async (loan, id) => {
  const ENDPOINT = `${URlLoans}/${id}`;
  const apiOpts = {
    method: 'put',
    body: JSON.stringify(loan),
    headers: { 'Content-Type': 'application/json' },
  };
  const res = await apiFetch(ENDPOINT, apiOpts);
  return res.json();
};

export const updateLoanPaymentStatus = async (loanId, paymentStatus) => {
  const apiOpts = {
    method: 'PATCH',
    body: JSON.stringify(paymentStatus),
    headers: { 'Content-Type': 'application/json' },
  };
  const res = await apiFetch(`${URlLoans}/${loanId}/payment-status`, apiOpts);
  return res;
};

export const deleteLoan = async (loanId) => {
  const apiOpts = {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
  };
  const res = await apiFetch(`${URlLoans}/${loanId}`, apiOpts);
  return res.json();
};


