export const createClient = async (client) => {
  const apiOpts = {
    method: 'post',
    body: JSON.stringify(client),
    headers: getHeaders({ 'Content-Type': 'application/json' }),
  };
  const res = await apiFetch('/clientes', apiOpts);
  return res.json();
};

export const allClients = async () => {
  const apiOpts = {
    method: 'get',
    headers: getHeaders({ 'Content-Type': 'application/json' }),
  };
  const res = await apiFetch('/clientes', apiOpts);
  return res.json();
};

export const apiFetch = async (url, options) => {
  const res = await fetch(url, options);
  if (!res.ok) {
    throw res;
  }
  return res;
};

const getCookie = (cname) => {
  const name = `${cname} =`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
};

export const getHeaders = (extraheaders) => {
  const headers = {
    'x-xsrf-token': getCookie('XSRF-TOKEN'),
    'cash-control': 'no-store',
    ...extraheaders,
  };
  return headers;
};
