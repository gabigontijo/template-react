import { useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import SelectMachin from './input-select-machin';
import SelectCardFlag from './input-select-card-flag';
import SelectPaymentType from './input-select-payment-type';
import SelectInstallments from './input-select-installments';
import SelectNumberOfCardsFields from './input-select-number-of-cards';

// ----------------------------------------------------------------------

export default function FormStepTwo() {
  const [requestedValue, setRequestedValue] = useState('');
  const [numberOfCards, setNumberOfCards] = useState(1);

  const handleRequestedValue = ({ target }) => {
    setRequestedValue(target.value);
  };

  const handleNumberOfCards = ({ target }) => {
    setNumberOfCards(target.value);
  };

  return (
    <Card sx={{ marginTop: '1.5em' }}>
      <Stack p={3}>
        <Stack spacing={2}>
          <Stack direction="row" spacing={2}>
            <Box width="50%">
              <TextField
                name="value"
                label="Valor Solicitado"
                type="number"
                fullWidth
                value={requestedValue}
                onChange={handleRequestedValue}
              />
            </Box>
            <SelectNumberOfCardsFields
              numberOfCards={numberOfCards}
              handleNumberOfCards={handleNumberOfCards}
            />
          </Stack>
          <Stack
            spacing={1}
            p={2}
            sx={{ marginTop: '1.5em', backgroundColor: 'rgba(145, 158, 171, 0.12)' }}
          >
            {Array.from({ length: Number(numberOfCards) }, (_, index) => (
              <div key={index}>
                <Typography variant="body2" sx={{ color: 'primary.main' }}>
                  {`Cartão ${index + 1}`}
                </Typography>
                <Stack direction="row" spacing={2} marginTop={2}>
                  <SelectMachin />
                  <SelectCardFlag />
                  <Box width="33%">
                    <TextField name="valueCard" label="Valor" type="number" fullWidth />
                  </Box>
                  <SelectInstallments numInstallments={12} />
                  <SelectPaymentType />
                </Stack>
              </div>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}
