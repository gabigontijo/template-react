export const loanInterface = {
    id: '',
    client: {
        id: '',
        name: '',
        phone: '',
        cpf: '',
        pixType: '',
        pixKey:'',
        partner: '',
        documenst: [],
    },
    value: '',
    operationPercent: '',
    amount: '',
    numberOfCards: 1,
    cards: [
        {
           cardMachineId: '',
           cardMachineName:'',
           brand: '',
           value: '',
           installments: '',
           machineValue: '',
           installmentsValue: '',
           clientAmount:'',
           grossProfit: '',
           paymentType: ''
        }
    ],
    partner:{
        id: '',
        name: '',
        phone: '',
        cpf: '',
        pixType: '',
        pixKey:'',
        address: '',
    },
    partnerProfit: {
        valuePartner:'',
        percentPartner:'',
    },
    grossProfit: '',
    profit:'',
    type: 1,
    clientAmount: '',
    paymentStatus: 'pending',
};

