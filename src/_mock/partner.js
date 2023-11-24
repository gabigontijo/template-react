import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

export const partners = [...Array(24)].map((_, index) => ({
  id: faker.number.int(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: faker.person.fullName(),
  email: faker.internet.email(),
  phone: faker.phone.number(),
  cpf: faker.finance.accountNumber(),
  pixType: faker.finance.transactionType(),
  pixKey: faker.finance.accountNumber(),
  adress: faker.location.street(),
  isVerified: faker.datatype.boolean(),
}));
