export const handleApiError = (error, auth) => {
    if (error.status === 401) {
      auth.logOut();
    } else {
      console.error('API error:', error);
    }
  };