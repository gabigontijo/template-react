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
    numberOfCards: '',
    cards: [
        {
           maquininhaId: 1,
           bandeira: 'master',
           valor: 100,
           parcelas: 5,
           tipoPagamento: 'Presencial'
        }
    ],
    partner:{
        id: '',
        name: '',
        phone: '',
        cpf: '',
        pixType: '',
        pixKey:'',
        adress: '',
    },
    partnerProfit: '',
    netProfit:'',

}

