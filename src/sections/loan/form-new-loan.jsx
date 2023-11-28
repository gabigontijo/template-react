import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import AlertNotifications from 'src/layouts/dashboard/common/alert-notifications';

import FormStepOne from './form-step-one';
import FormStepTwo from './form-step-two';
import FormStepThree from './form-step-three';

const steps = ['Selecione o cliente', 'Dados do empréstimo', 'Selecione o parceiro'];

export default function FormNewLoan({ filterName, onFilterName }) {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [isNewPartner, setIsNewPartner] = useState(false);
  const [sendAlertClient, setSendAlertClient] = useState(false);
  const [sendAlertPartner, setSendAlertPartner] = useState(false);


  const isStepSkipped = (step) => {
    skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // const handleAddUser = () => {
  //   // setNewUser(true);
  //   // setCloseAdd(true);
  // };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};

          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length && (
        <>
          <TextField name="name" label="Cliente" type="text" fullWidth />
          <Typography sx={{ mt: 2, mb: 1 }}>All steps completed - you&apos;re finished</Typography>
        </>
      )}
      {activeStep === 0 && (
        <FormStepOne
          filterName={filterName}
          onFilterName={onFilterName}
          isNewClient={isNewPartner}
          setIsNewClient={setIsNewPartner}
          setSendAlert={setSendAlertClient}
        />
      )}
      {sendAlertClient && (
        <AlertNotifications
          sendAlert={sendAlertClient}
          setSendAlert={setSendAlertClient}
          message="Cliente cadastrado com sucesso!"
        />
      )}
      {activeStep === 1 && <FormStepTwo />}
      {activeStep === 2 && (
        <FormStepThree
          setSendAlert={setSendAlertPartner}
          filterName={filterName}
          onFilterName={onFilterName}
          isNewPartner={isNewPartner}
          setIsNewPartner={setIsNewPartner}
        />
      )}
      {sendAlertPartner && (
        <AlertNotifications
          sendAlert={sendAlertPartner}
          setSendAlert={setSendAlertPartner}
          message="Parceiro cadastrado com sucesso!"
        />
      )}
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
          Back
        </Button>
        <Box sx={{ flex: '1 1 auto' }} />

        <Button onClick={handleNext}>{activeStep === steps.length - 1 ? 'Finish' : 'Next'}</Button>
      </Box>
    </Box>
  );
}

FormNewLoan.propTypes = {
  setNewUser: PropTypes.func,
  setSendAlert: PropTypes.func,
  setCloseAdd: PropTypes.func,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};
