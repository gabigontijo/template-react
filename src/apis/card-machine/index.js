import { apiFetch, getHeaders } from '..';

const URlcardMachines = '/cashbycard/card-machines';

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
  const response = await fetch(URlcardMachines);
  const result = await response.json();
  return result;
};

export const cardMachineById = async (cardMachineId) => {
  const ENDPOINT = `${URlcardMachines}/${cardMachineId}`;
  const response = await fetch(ENDPOINT);
  const result = await response.json();
  return result;
};

export const updateCardMachine = async (cardMachine, cardMachineId) => {
  const apiOpts = {
    method: 'put',
    body: JSON.stringify(cardMachine),
    headers: getHeaders({ 'Content-Type': 'application/json' }),
  };
  const res = await apiFetch(`${URlcardMachines}/${cardMachineId}`, apiOpts);
  return res.json();
};

export const deleteCardMachine = async (cardMachineId) => {
  const apiOpts = {
    method: 'delete',
    headers: getHeaders({ 'Content-Type': 'application/json' }),
  };
  const res = await apiFetch(`${URlcardMachines}/${cardMachineId}`, apiOpts);
  return res.json();
};
