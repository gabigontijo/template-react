export const apiFetch = async (url, options) => {
  const res = await fetch(url, options);
  if (!res.ok) {
    throw res;
  }
  return res;
};

// const getCookie = (cname) => {
//   const name = `${cname} =`;
//   const decodedCookie = decodeURIComponent(document.cookie);
//   const ca = decodedCookie.split(';');
//   for (let i = 0; i < ca.length; i += 1) {
//     let c = ca[i];
//     while (c.charAt(0) === ' ') {
//       c = c.substring(1);
//     }
//     if (c.indexOf(name) === 0) {
//       return c.substring(name.length, c.length);
//     }
//   }
//   return '';
// };

export const getHeaders = (extraheaders) => {
  const headers = {
    'cash-control': 'no-store',
    ...extraheaders,
  };
  return headers;
};
