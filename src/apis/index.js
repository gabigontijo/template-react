export const apiFetch = async (url, options = {}) => {
  const token = localStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const updatedOptions = {
    ...options,
    headers,
  };
  const res = await fetch(url, updatedOptions);

  if (!res.ok) {
    const errorData = await res.json();
    const error = new Error(errorData.message || 'API error'); 
    error.status = res.status; 
    throw error;
  }

  return res;
};
