import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------


export const loans = [...Array(24)].map((_, index) => ({
  id: faker.number.int(),
  client: faker.person.fullName(),
  value: faker.finance.amount(),
  banner: faker.finance.creditCardIssuer(),
  valueMachine: faker.finance.amount(),
  installments: faker.finance.amount({ min: 1, max: 18 }),
  grossProfit: faker.finance.amount(),
  partner: faker.person.fullName(),
  partnerProfit: faker.finance.amount(),
  netProfit: faker.finance.amount(),
}));
