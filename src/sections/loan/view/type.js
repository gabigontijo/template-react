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

export const cardMachineInterface = {
    id: 1,
    name: '',
    brand: [],
    presentialTax: {},
    onlineTax: {},
    installments: 18,
} 

