import { useState } from 'react';
import PropTypes from 'prop-types';
// import { useQuery } from "react-query";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
// import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// import { allCardMachines } from 'src/apis/card-machine';

// import { cardMachineInterface } from './view/type';
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

  // const [cardMachineList, setCardMachineList] = useState([cardMachineInterface]);

  const getDefaultCard = () => ({
    machineId: 1,
    banner: '',
    value: '',
    installments: '',
    paymentType: '',
    installmentsValue: '',
  });

  const [numberOfCards, setNumberOfCards] = useState(1);
  const [cards, setCards] = useState(
    Array.from({ length: Number(numberOfCards) }, (_, index) => getDefaultCard())
  );

  // useQuery("allCardMachines", allCardMachines, {
  //   onSuccess: (response) => {
  //     setCardMachineList(response.CardMachines);
  //     console.log(response.CardMachines)
  //   },
  //   onError: (error) => {
  //     console.error('Erro ao carregar maquininhas:', error);
  //   }
  // });

  const handleRequestedValue = ({ target }) => {
    setLoan({
      ...loan,
      'value': target.value,
    });
  };

  const handleTypeLoan = ({ target }) => {
    console.log(target.value);
    setLoan({
      ...loan,
      'type': target.value,
    });
  };


  const handleRequestedOperationPercent = ({ target }) => {
    setLoan({
      ...loan,
      'operationPercent': target.value,
    });
  }

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
      console.log("item",updatedCards[cardIndex][field]);
      console.log("value", value);

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
          <Box>
          <SelectTypeLoan handleChange={handleTypeLoan} loanType={loan.type}/>
        </Box>
            <Box width="30%">
              <NumberFormatField
                name="value"
                label="Valor Solicitado"
                value={loan.value}
                handleChange={handleRequestedValue}
              />
            </Box>
            <Box width="30%">
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
                <Stack direction="row" spacing={2} marginTop={2}>
                  <SelectMachin 
                      cardMachineList= {cardMachineList}
                      name={`machin-${index}`}
                      value={card.machineId}
                      onChange={(e) => handleCardChange(index, 'cardMachineId', Number(e.target.value))} />
                  <SelectCardFlag 
                      cardMachineId={card.machineId}
                      cardMachineList= {cardMachineList}
                      name={`flag-${index}`}
                      value={card.banner}
                      onChange={(e) => handleCardChange(index, 'brand', e.target.value)} />
                  <Box width="33%">
                    <NumberFormatField
                      name={`valueCard-${index}`}
                      label="Valor"
                      value={card.value}
                      handleChange={(e) => handleCardChange(index, 'value', Number(e.target.value))}
                    />
                  </Box>
                  <SelectInstallments
                    cardMachineId={card.machineId}
                    cardMachineList= {cardMachineList}
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
  cardMachineList: PropTypes.any
};
