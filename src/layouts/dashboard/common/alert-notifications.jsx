// import { useState } from 'react';
import PropTypes from 'prop-types';

import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

// ----------------------------------------------------------------------

export default function AlertNotifications({ sendAlert, setSendAlert, message }) {
  return (
 
      <Snackbar
        open={sendAlert}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={6000}
        onClose={() => {
          setSendAlert(false);
        }}
      >
        <Alert
          onClose={() => {
            setSendAlert(false);
          }}
          severity="success"
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>

         
  );
}

AlertNotifications.propTypes = {
  setSendAlert: PropTypes.func,
  sendAlert: PropTypes.bool,
  message: PropTypes.string,
};
