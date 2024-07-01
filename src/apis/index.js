
export const apiFetch =async (url, options = {})=> {

  const token = localStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if(token){
    headers.Authorization  = `Bearer ${token}`;
  }

  const updatedOptions = {
    ...options,
    headers,
  };
  try {
    const res = await fetch(url, updatedOptions);

    if (!res.ok) {
      throw res;
    }

    return res;
  } catch (error) {
    console.error('API fetch error:', error);
    throw error;
  }

};
