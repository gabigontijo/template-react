import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
// import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import SelectMachin from '../common/input-select-machin';
import NumberFormatField from '../common/number-format-field';
import SelectCardFlag from '../common/input-select-card-flag';
import SelectPaymentType from '../common/input-select-payment-type';
import SelectInstallments from '../common/input-select-installments';
import SelectNumberOfCardsFields from '../common/input-select-number-of-cards';

// ----------------------------------------------------------------------

export default function FormStepTwo({ loan, setLoan }) {

  const getDefaultCard = () => ({
    machinId: '',
    banner: '',
    value: '',
    installments: '',
    paymentType: '',
  });

  const [numberOfCards, setNumberOfCards] = useState(1);
  const [cards, setCards] = useState(
    Array.from({ length: Number(numberOfCards) }, (_, index) => getDefaultCard())
  );


  const handleRequestedValue = ({ target }) => {
    setLoan({
      ...loan,
      'value': target.value,
    });
  };

  const getUpdatedCards = (newQuantity) => {
    if (loan.numberOfCards > newQuantity) {
      return loan.cards.slice(0, newQuantity)
    }

    if (loan.numberOfCards < newQuantity) {
      for (let i = 0; i < newQuantity - loan.numberOfCards; i += 1) {
        loan.cards.push(getDefaultCard())
      }
      return loan.cards
    }
    return null;
  }

  const handleNumberOfCards = ({ target }) => {
    const qttCards = target.value
    setNumberOfCards(Number(qttCards));
    const cardsUpdated = getUpdatedCards(qttCards)
    setCards(cardsUpdated)

    console.log(typeof qttCards, Number(qttCards));
    setLoan({
      ...loan,
      'numberOfCards': qttCards,
      'cards': cardsUpdated,
    });
  };

  const handleCardChange = (cardIndex, field, value) => {
    setCards((prevCards) => {
      const updatedCards = [...prevCards];
      updatedCards[cardIndex][field] = value;

      setLoan((prevLoan) => ({
        ...prevLoan,
        cards: updatedCards,
      }));
      return updatedCards;
    });
  };


  return (
    <Card sx={{ marginTop: '1.5em' }}>
      <Stack p={3}>
        <Stack spacing={2}>
          <Stack direction="row" spacing={2}>
            <Box width="50%">
              <NumberFormatField
                name="value"
                label="Valor Solicitado"
                value={loan.value}
                handleChange={handleRequestedValue}
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
            {cards.map((card, index) => (
              <div key={index}>
                <Typography variant="body2" sx={{ color: 'primary.main' }}>
                  {`Cartão ${index + 1}`}
                </Typography>
                <Stack direction="row" spacing={2} marginTop={2}>
                  <SelectMachin />
                  <SelectCardFlag />
                  <Box width="33%">
                    {/* <TextField
                      name={`valueCard-${index}`}
                      label="Valor"
                      type="number"
                      fullWidth
                      value={card.value}
                      onChange={(e) => handleCardChange(index, 'value', Number(e.target.value))}
                    /> */}
                    <NumberFormatField
                      name={`valueCard-${index}`}
                      label="Valor"
                      value={card.value}
                      handleChange={(e) => handleCardChange(index, 'value', Number(e.target.value))}
                    />
                  </Box>
                  <SelectInstallments
                    numInstallments={12}
                    value={card.installments}
                    onChange={(e) => handleCardChange(index, 'installments', Number(e.target.value))}
                  />
                  <SelectPaymentType
                    value={card.paymentType}
                    onChange={(e) => handleCardChange(index, 'paymentType', e.target.value)} />
                </Stack>
              </div>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}

FormStepTwo.propTypes = {
  setLoan: PropTypes.func,
  loan: PropTypes.any,
};
