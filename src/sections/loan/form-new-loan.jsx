import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { allClients } from 'src/apis/client';
import { allPartners } from 'src/apis/partner';
import { createLoan, updateLoan } from 'src/apis/loan';
import { allCardMachines } from 'src/apis/card-machine';

import FormStepOne from './form-step-one';
import FormStepTwo from './form-step-two';
import { loanInterface } from './view/type';
import FormStepThree from './form-step-three';
import DialogMessage from '../common/dialog-message';
import { machineInterface } from '../machine/view/type';
import { createBodyLoan, createBodyStepTwo } from './service';

const steps = ['Selecione o cliente', 'Dados do empréstimo', 'Selecione o parceiro'];

export default function FormNewLoan({
  filterName,
  onFilterName,
  setAlert,
  setMessageAlert,
  setAlertError,
  setMessageError,
  setStateLoan,
  stateLoan,
  loanId,
  setLoanId,
  setNewLoan,
  refetchLoans,
}) {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const [isNewPartner, setIsNewPartner] = useState(false);
  const [isNewClient, setIsNewClient] = useState(false);
  const [clientList, setClientList] = useState([]);
  const [partnerList, setPartnerList] = useState([]);
  const [cardMachineList, setCardMachineList] = useState([machineInterface]);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {}, [stateLoan]);

  const { isLoading: isLoadingClients, refetch: refetchClients } = useQuery(
    'allClients',
    allClients,
    {
      onSuccess: (response) => {
        setClientList(response.Clients);
      },
      onError: (error) => {
        console.error('Erro ao carregar clientes:', error);
      },
    }
  );

  const { isLoading: isLoandingPartners, refetch: refetchPartners } = useQuery(
    'allPartners',
    allPartners,
    {
      onSuccess: (response) => {
        setPartnerList(response.Partners);
      },
      onError: (error) => {
        console.error('Erro ao carregar Parceiros:', error);
      },
    }
  );

  useQuery('allCardMachines', allCardMachines, {
    onSuccess: (response) => {
      setCardMachineList(response.CardMachines);
    },
    onError: (error) => {
      console.error('Erro ao carregar maquininhas:', error);
    },
  });

  const isStepSkipped = (step) => {
    skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    if (activeStep === 1) {
      let totalValue = 0;
      for (let i = 0; i < stateLoan.cards.length; i += 1) {
        totalValue += stateLoan.cards[i].value;
      }
      if (totalValue !== stateLoan.askValue) {
        setOpenDialog(true)
        return;
      }
      createBodyStepTwo(setStateLoan, stateLoan, cardMachineList);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleSubmit = async () => {
    try {
      await createLoan(createBodyLoan(setStateLoan, stateLoan));
      setNewLoan(false);
      setAlert(true);
      setMessageAlert('Empréstimo cadastrado com sucesso');
      refetchLoans();
      setStateLoan(loanInterface);
    } catch (error) {
      setAlertError(true);
      setMessageError('Erro ao Cadastrar o empréstimo');
    }
  };

  const handleSubmitEdit = async () => {
    console.log('loanId', loanId)
    try {
      const nonEmptyState = Object.fromEntries(
        Object.entries(stateLoan).map(([key, value]) => [key, value || ''])
      );
      const bodyLoanEdit = {
        clientId: nonEmptyState.client.id,
        askValue: nonEmptyState.askValue,
        operationPercent: nonEmptyState.operationPercent,
        amount: nonEmptyState.amount,
        numberCards: nonEmptyState.numberCards,
        cards: nonEmptyState.cards,
        partnerId: nonEmptyState.partner.id,
        partnerPercent: Number(nonEmptyState.partnerPercent),
        partnerAmount: Number(nonEmptyState.partnerAmount),
        grossProfit: nonEmptyState.grossProfit,
        profit: nonEmptyState.profit,
        type: nonEmptyState.type,
        clientAmount: nonEmptyState.clientAmount,
        paymentStatus: nonEmptyState.paymentStatus,
      };
      await updateLoan(bodyLoanEdit, loanId);
      setNewLoan(false);
      setLoanId(null);
      setAlert(true);
      setMessageAlert('Empréstimo editado com sucesso');
      setStateLoan(loanInterface);
      refetchLoans();
    } catch (error) {
      setAlertError(true);
      setMessageError('Erro ao Editar o empréstimo');
      setNewLoan(true);
      console.log('Erro ao Editar o empréstimo:', error);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};

          return (
            <Step key={label} {...stepProps} sx={{ height: 'fit-content' }}>
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
          isNewClient={isNewClient}
          setIsNewClient={setIsNewClient}
          setAlert={setAlert}
          setAlertError={setAlertError}
          setMessageAlert={setMessageAlert}
          setMessageError={setMessageError}
          setLoan={setStateLoan}
          loan={stateLoan}
          clientList={clientList}
          refetchClients={refetchClients}
          isLoading={isLoadingClients}
        />
      )}

      {activeStep === 1 && (
        <FormStepTwo setLoan={setStateLoan} loan={stateLoan} cardMachineList={cardMachineList} />
      )}
      {activeStep === 2 && (
        <FormStepThree
          setAlert={setAlert}
          setAlertError={setAlertError}
          setMessageAlert={setMessageAlert}
          setMessageError={setMessageError}
          filterName={filterName}
          onFilterName={onFilterName}
          isNewPartner={isNewPartner}
          setIsNewPartner={setIsNewPartner}
          setLoan={setStateLoan}
          loan={stateLoan}
          isLoading={isLoandingPartners}
          partnerList={partnerList}
          refetchPartners={refetchPartners}
        />
      )}

      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
          Voltar
        </Button>
        <Box sx={{ flex: '1 1 auto' }} />
        {loanId === null && (
          <Button onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}>
            {activeStep === steps.length - 1 ? 'Cadastrar' : 'Avançar'}
          </Button>
        )}
        {loanId !== null && (
          <Button onClick={activeStep === steps.length - 1 ? handleSubmitEdit : handleNext}>
            {activeStep === steps.length - 1 ? 'Editar' : 'Avançar'}
          </Button>
        )}
      </Box>
      <DialogMessage message='Somatório errado no valor dos cartões' open={openDialog} setOpen={setOpenDialog} title='Erro no valor dos Cartões'/>
    </Box>
  );
}

FormNewLoan.propTypes = {
  setCloseAdd: PropTypes.func,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  setAlert: PropTypes.func,
  setAlertError: PropTypes.func,
  setMessageError: PropTypes.func,
  setMessageAlert: PropTypes.func,
  setStateLoan: PropTypes.func,
  stateLoan: PropTypes.any,
  loanId: PropTypes.any,
  setLoanId: PropTypes.func,
  setNewLoan: PropTypes.func,
  refetchLoans: PropTypes.func,
};
