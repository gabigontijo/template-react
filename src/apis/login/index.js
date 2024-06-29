import { apiFetch } from "..";

// const URlLogin = 'http://localhost:3001/login';
const URlLogin = '/cashbycard/auth/login';

export const login = async (email, password) => {
  const apiOpts = {
    method: 'post',
    body: JSON.stringify({email, password}),
    headers:{ 'Content-Type': 'application/json' },
  };
  const res = await apiFetch(URlLogin, apiOpts);
  return res.json();
};




