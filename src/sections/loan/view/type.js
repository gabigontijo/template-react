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
           valueWithTax: '',
           installments: '',
           paymentType: '',
           installmentsValue: ''
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
    netProfit:'',
    type: 1,
    clientAmount: '',
    paymentStatus: '',
};

