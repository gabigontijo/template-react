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
           machineId: '',
           banner: '',
           value: '',
           installments: '',
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
    netProfit:'',
    paymentStatus: '',
};

export const cardMachineInterface = {
    id: 1,
    name: '',
    brand: [],
    presentialTax: '',
    onlineTax: '',
    installments: 18,
} 

