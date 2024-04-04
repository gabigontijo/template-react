import { useState } from 'react';
import PropTypes from 'prop-types';
// import { useQuery } from "react-query";

import { NumericFormat } from 'react-number-format';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';

import { definedLimit, definedValue } from './service';
import SelectMachin from '../common/input-select-machin';
import NumberFormatField from '../common/number-format-field';
import SelectCardFlag from '../common/input-select-card-flag';
import SelectTypeLoan from '../common/input-select-type-loan';
import PercentFormatField from '../common/percent-format-field';
import SelectPaymentType from '../common/input-select-payment-type';
import SelectInstallments from '../common/input-select-installments';
import SelectNumberOfCardsFields from '../common/input-select-number-of-cards';

// ----------------------------------------------------------------------

export default function FormStepTwo({ loan, setLoan, cardMachineList }) {
  const getDefaultCard = () => ({
    cardMachineId: '',
    cardMachineName: '',
    brand: '',
    value: '',
    installments: '',
    machineValue: '',
    installmentsValue: '',
    clientAmount: '',
    grossProfit: '',
    paymentType: '',
  });

  const [numberOfCards, setNumberOfCards] = useState(loan.numberCards ?? 1);
  const [cards, setCards] = useState(
    loan.cards ?? Array.from({ length: Number(numberOfCards) }, (_, index) => getDefaultCard())
  );

  const calculatePreviewValue = (cardIndex) => {
    const card = cards[cardIndex];
    if (card.value && card.installments && card.paymentType && loan.operationPercent) {
      if (card.value !== '') {
        let finalValue;
        const cardMachine = cardMachineList.find((cm) => cm.id === card.cardMachineId);
        if (loan.type === 2) {
          finalValue = definedLimit(
            card.value,
            card.installments,
            loan.operationPercent,
            cardMachine[card.paymentType]
          );
        } else {
          finalValue = definedValue(
            card.value,
            card.installments,
            loan.operationPercent,
            cardMachine[card.paymentType]
          );
        }
        card.machineValue = finalValue.machineValue;
        card.clientAmount = finalValue.clientAmount;
        card.installmentsValue = finalValue.installmentsValue;
        card.grossProfit = finalValue.grossProfit;
        card.cardMachineName = cardMachine.name;
        cards[cardIndex] = card;
        setCards([...cards]);
      }
    }
  };

  const handleRequestedValue = ({ target }) => {
    setLoan({
      ...loan,
      askValue: target.value,
    });
  };

  const handleTypeLoan = ({ target }) => {
    setLoan({
      ...loan,
      type: target.value,
    });
  };

  const handleRequestedOperationPercent = ({ target }) => {
    setLoan({
      ...loan,
      operationPercent: target.value,
    });
  };

  const getUpdatedCards = (newQuantity) => {
    // eslint-disable-next-line no-debugger
    debugger;
    if (numberOfCards !== 0) {
      if (numberOfCards > newQuantity) {
        return cards.slice(0, newQuantity);
      }

      if (numberOfCards < newQuantity) {
        for (let i = numberOfCards; i <= newQuantity - loan.numberCards; i += 1) {
          cards.push(getDefaultCard());
        }
        return cards;
      }
    }
    return null;
  };

  const handleNumberOfCards = ({ target }) => {
    const qttCards = target.value;
    setNumberOfCards(Number(qttCards));
    const cardsUpdated = getUpdatedCards(qttCards);
    setCards(cardsUpdated);

    console.log(typeof qttCards, Number(qttCards));
    setLoan({
      ...loan,
      numberOfCards: qttCards,
      cards: cardsUpdated,
    });
  };

  const handleCardChange = (cardIndex, field, value) => {
    let updatedCards = [];
    setCards((prevCards) => {
      updatedCards = [...prevCards];
      updatedCards[cardIndex][field] = value;
      return updatedCards;
    });

    setLoan((prevLoan) => ({
      ...prevLoan,
      cards: updatedCards,
    }));
  };
  const handleCardPaymentChange = (cardIndex, field, value) => {
    setCards((prevCards) => {
      const updatedCards = [...prevCards];
      updatedCards[cardIndex][field] = value;
      setLoan((prevLoan) => ({
        ...prevLoan,
        cards: updatedCards,
      }));
      return updatedCards;
    });
    calculatePreviewValue(cardIndex);
  };

  return (
    <Card sx={{ marginTop: '1.5em' }}>
      <Stack p={3}>
        <Stack spacing={2}>
          <Stack
            spacing={{ xs: 1, sm: 2 }}
            direction="row"
            useFlexGap
            sx={{
              flexWrap: {
                xs: 'wrap',
                sm: 'nowrap',
              },
            }}
          >
            <Box width={{ xs: '100%', md: '30%' }}>
              <SelectTypeLoan handleChange={handleTypeLoan} loanType={loan.type} />
            </Box>
            <Box width={{ xs: '100%', md: '30%' }}>
              <NumberFormatField
                name="value"
                label="Valor Solicitado"
                value={loan.askValue}
                handleChange={handleRequestedValue}
              />
            </Box>
            <Box width={{ xs: '100%', md: '30%' }}>
              <PercentFormatField
                name="operationPercent"
                label="Taxa da operação"
                value={loan.operationPercent}
                handleChange={handleRequestedOperationPercent}
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
                <Stack
                  marginTop={2}
                  spacing={1}
                  direction="row"
                  useFlexGap
                  sx={{
                    flexWrap: {
                      xs: 'wrap',
                      sm: 'nowrap',
                    },
                  }}
                >
                  <SelectMachin
                    cardMachineList={cardMachineList}
                    name={`machin-${index}`}
                    value={card.cardMachineId}
                    onChange={(e) =>
                      handleCardChange(index, 'cardMachineId', Number(e.target.value))
                    }
                  />
                  <SelectCardFlag
                    cardMachineId={card.cardMachineId}
                    cardMachineList={cardMachineList}
                    name={`flag-${index}`}
                    value={card.brand}
                    onChange={(e) => handleCardChange(index, 'brand', e.target.value)}
                  />
                  <SelectInstallments
                    cardMachineId={card.cardMachineId}
                    cardMachineList={cardMachineList}
                    value={card.installments}
                    onChange={(e) =>
                      handleCardChange(index, 'installments', Number(e.target.value))
                    }
                  />
                  <Box width={{ xs: '100%', md: '30%' }}>
                    <NumberFormatField
                      name={`valueCard-${index}`}
                      label="Valor"
                      value={card.value}
                      handleChange={(e) => handleCardChange(index, 'value', Number(e.target.value))}
                    />
                  </Box>
                  <SelectPaymentType
                    value={card.paymentType}
                    machineSelected={cardMachineList.find((m) => m.id === card.cardMachineId)}
                    onChange={(e) => handleCardPaymentChange(index, 'paymentType', e.target.value)}
                  />
                  <Box width={{ xs: '100%', md: '25%' }}>
                    <Typography variant="body1" sx={{ color: 'primary.main' }}>
                      Valor Máquina
                    </Typography>
                    <NumericFormat
                      fullWidth
                      label="Valor Maquina"
                      customInput={Input}
                      thousandSeparator="."
                      fixedDecimalScale
                      decimalSeparator=","
                      prefix="R$ "
                      allowNegative={false}
                      decimalScale={2}
                      value={card.machineValue}
                      readOnly
                    />
                    <Box alignItems="center" width="100%" display="flex" justifyContent="end">
                      <Button
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'end',
                          pt: 1,
                          pb: 1,
                        }}
                        onClick={() => calculatePreviewValue(index)}
                      >
                        <Typography variant="body2" sx={{ color: 'primary.main' }}>
                          Atualizar
                        </Typography>
                        <Iconify icon="dashicons:update" />
                      </Button>
                    </Box>
                  </Box>
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
  cardMachineList: PropTypes.any,
};
