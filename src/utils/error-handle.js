export const handleApiError = async (error, auth) => {
  switch (error.status) {
    case 401:
      auth.logOut();
      break;
    case 400:
        return error.message
    default:
      return 'Erro na requisição'
  }
   return 'Erro na requisição'
  };