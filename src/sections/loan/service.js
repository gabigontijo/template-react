export const createBodyStepTwo = (setStateLoan, stateLoan, cardMachineList) => {
  const objResult = {
    grossProfit: 0,
    clientAmount: 0,
    amount: 0,  };
    for (let index = 0; index < stateLoan.cards.length; index += 1) {
        objResult.clientAmount += stateLoan.cards[index].clientAmount;
        objResult.grossProfit += stateLoan.cards[index].grossProfit;
        objResult.amount += stateLoan.cards[index].machineValue;
      }
  setStateLoan({
    ...stateLoan,
    grossProfit: objResult.grossProfit,
    clientAmount: objResult.clientAmount,
    amount: objResult.amount,
  });
};

export const definedLimit = (value, installments, operationPercent, jsonTax) => {
   // eslint-disable-next-line no-debugger
   debugger;
  const machineTax = (jsonTax[installments] / 100) * value;
  const machineAmount = value - machineTax;
  const installmentsValue = value / installments;
  const grossProfit = (machineAmount * operationPercent) / 100;
  const clientAmount = machineAmount - grossProfit;
  const machineValue = value;
  return { grossProfit, clientAmount, installmentsValue, machineValue };
};

export const definedValue = (value, installments, operationPercent, jsonTax) => {
  // eslint-disable-next-line no-debugger
  debugger;
  const newTax = jsonTax[installments] / 100 + 1;
  const ValueTaxed = value * (operationPercent / 100 + 1);
  const machineValue = ValueTaxed * newTax;
  const installmentsValue = machineValue / installments;
  const grossProfit = (value * operationPercent) / 100;
  const clientAmount = value;
  return { grossProfit, clientAmount, installmentsValue, machineValue };
};

export const createBodyLoan = (setStateLoan, stateLoan) => {
  let profit = stateLoan.grossProfit;
  if (stateLoan.partner.id !== '') {
    profit -= Number(stateLoan.partnerProfit.valuePartner);
    setStateLoan({
      ...stateLoan,
      profit,
    });
  } else {
    setStateLoan({
      ...stateLoan,
      profit,
      partnerId: null,
      partnerPercent: null,
      partnerAmount: null,
    });
  }
  return {
    clientId: stateLoan.client.id,
    askValue: stateLoan.value,
    operationPercent: stateLoan.operationPercent,
    amount: stateLoan.amount,
    numberCards: stateLoan.numberOfCards,
    cards: stateLoan.cards,
    partnerId: stateLoan.partner.id === '' ? null : stateLoan.partner.id,
    partnerPercent: Number(stateLoan.partnerProfit.percentPartner),
    partnerAmount: Number(stateLoan.partnerProfit.valuePartner),
    grossProfit: stateLoan.grossProfit,
    profit,
    type: stateLoan.type,
    clientAmount: stateLoan.clientAmount,
    paymentStatus: 'pending',
  };
};
