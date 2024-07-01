import { apiFetch } from '..';

const URlcardMachines = '/cashbycard/admin/card-machines';
// const URlcardMachines = 'http://localhost:3001/card-machines';

export const createCardMachine = async (cardMachine) => {
  const apiOpts = {
    method: 'post',
    body: JSON.stringify(cardMachine),
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const res = await apiFetch(URlcardMachines, apiOpts);
  return res.json();
};

export const allCardMachines = async () => {
  const apiOpts = {
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
  };
  const res = await apiFetch(URlcardMachines, apiOpts);
  return res.json();
};

export const cardMachineById = async (cardMachineId) => {
  const apiOpts = {
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
  };
  const res = await apiFetch(`${URlcardMachines}/${cardMachineId}`, apiOpts);
  return res.json();
};

export const updateCardMachine = async (cardMachine, cardMachineId) => {
  const apiOpts = {
    method: 'put',
    body: JSON.stringify(cardMachine),
    headers: { 'Content-Type': 'application/json' },
  };
  const res = await apiFetch(`${URlcardMachines}/${cardMachineId}`, apiOpts);
  return res.json();
};

export const deleteCardMachine = async (cardMachineId) => {
  const apiOpts = {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
  };
  const res = await apiFetch(`${URlcardMachines}/${cardMachineId}`, apiOpts);
  return res.json();
};
