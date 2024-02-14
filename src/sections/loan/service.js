
export const createBodyStepTwo = (setStateLoan, stateLoan, cardMachineList) => {
    const objResult = {
        "grossProfit": 0,
        "clientAmount":  0,
    };
    let amount;
    if(stateLoan.type === 1){
        for (let index = 0; index < stateLoan.cards.length; index += 1) {
            const cardMachine = cardMachineList.find((cm)=> cm.id === stateLoan.cards[index].machineId);
            if (stateLoan.cards[index].paymentType === "online"){
                const result = definedValue(stateLoan.cards[index].value, stateLoan.cards[index].installments, stateLoan.operationPercent, cardMachine.onlineTax);
                objResult.clientAmount += result.clientAmount
                objResult.grossProfit += result.grossProfit
                setCardInstallmentsValue(setStateLoan, stateLoan, index, result.installmentsValue, cardMachine.name)
            }
            else{
                const result = definedValue(stateLoan.cards[index].value, stateLoan.cards[index].installments, stateLoan.operationPercent, cardMachine.presentialTax);
                objResult.clientAmount += result.clientAmount
                objResult.grossProfit += result.grossProfit
                setCardInstallmentsValue(setStateLoan, stateLoan, index, result.installmentsValue, cardMachine.name)
            }
        }
        amount = stateLoan.value + (stateLoan.value * setStateLoan.operationPercent/100);
    }
    else {
        for (let index = 0; index < stateLoan.cards.length; index += 1) {
            const cardMachine = cardMachineList.find((cm)=> cm.id === stateLoan.cards[index].machineId);
            if (stateLoan.cards[index].paymentType === "online"){
                const result = definedLimit(stateLoan.cards[index].value, stateLoan.cards[index].installments, stateLoan.operationPercent, cardMachine.onlineTax);
                objResult.clientAmount += result.clientAmount
                objResult.grossProfit += result.grossProfit
                setCardInstallmentsValue(setStateLoan, stateLoan, index, result.installmentsValue, cardMachine.name)
            }
            else{
                const result = definedLimit(stateLoan.cards[index].value, stateLoan.cards[index].installments, stateLoan.operationPercent, cardMachine.presentialTax);
                objResult.clientAmount += result.clientAmount
                objResult.grossProfit += result.grossProfit
                setCardInstallmentsValue(setStateLoan, stateLoan, index, result.installmentsValue, cardMachine.name)
            }
        }
        amount = stateLoan.value; 

    }
    
    console.log('objResult.grossProfit', objResult.grossProfit)
    console.log('objResult.clientAmount', objResult.clientAmount)
    setStateLoan({
        ...stateLoan,
        grossProfit: objResult.grossProfit,
        clientAmount: objResult.clientAmount,
        amount,
    })
}

const definedLimit = (value, installments, operationPercent, jsonTax) => {
    const machineTax = jsonTax[installments]/100 * value;
    const machineAmount = value - machineTax;
    const installmentsValue = value/installments
    const grossProfit = machineAmount * operationPercent/100;
    const clientAmount = machineAmount - grossProfit;

    return {grossProfit,
    clientAmount, installmentsValue}
}

const definedValue = (value, installments, operationPercent, jsonTax) => {
    const newTax = (jsonTax[installments] + operationPercent)/100 + 1
    const MachineValue = value*newTax;
    const installmentsValue = MachineValue/installments
    const grossProfit = value * operationPercent/100;
    const clientAmount = value;

    return {grossProfit,
    clientAmount, 
installmentsValue}
}

const setCardInstallmentsValue = (setLoan, loan, index, installmentsValue, cardMachineName)=> {
    const updateCards = [...loan.cards];
    updateCards[index].installmentsValue= installmentsValue;
    updateCards[index].cardMachineName= cardMachineName;
    setLoan({
        ...loan,
        cards: updateCards
    })
}

export const createBodyLoan = (setStateLoan, stateLoan) => {
    const grossProfit = stateLoan.value + (stateLoan.value*stateLoan.operationPercent/100);
    let profit = grossProfit
    if (stateLoan.partner.id !== ''){
        profit = grossProfit - Number(stateLoan.partnerProfit.valuePartner)
    }
    setStateLoan({
        ...stateLoan,
        netProfit: profit,
    })
    return {
        clientId: stateLoan.client.id,
        askValue: stateLoan.value,
        operationPercent: stateLoan.operationPercent,
        amount: stateLoan.amount,
        numberCards: stateLoan.numberOfCards,
        cards: stateLoan.cards,
        partnerId: stateLoan.partner.id,
        partnerPercent: stateLoan.partnerProfit.percentPartner,
        partnerAmount: stateLoan.partnerProfit.valuePartner,
        grossProfit: stateLoan.grossProfit,
        profit,
        type: stateLoan.type,
        clientAmount: stateLoan.clientAmount,
        paymentStatus: 'pending'
      }
 }