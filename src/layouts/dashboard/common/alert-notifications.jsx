// import { useState } from 'react';
import PropTypes from 'prop-types';

import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

// ----------------------------------------------------------------------

export default function AlertNotifications({ sendAlert, setSendAlert, message, setSendAlertError, sendAlertError }) {
  return (
    <>
      {sendAlert && (
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
      )}
      {sendAlertError && (
        <Snackbar
          open={sendAlertError}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          autoHideDuration={6000}
          onClose={() => {
            setSendAlertError(false);
          }}
        >
          <Alert
            onClose={() => {
              setSendAlertError(false);
            }}
            severity="error"
            sx={{ width: '100%' }}
          >
            {message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
}

AlertNotifications.propTypes = {
  setSendAlert: PropTypes.func,
  sendAlert: PropTypes.bool,
  message: PropTypes.string,
  setSendAlertError: PropTypes.func,
  sendAlertError: PropTypes.bool,
};
