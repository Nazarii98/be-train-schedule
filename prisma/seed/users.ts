import { UserCreateDto } from 'src/dto/userCreateInput.dto';
import { Role } from '../../src/enums/role.enum';

export const usersData: UserCreateDto[] = [
  {
    email: 'user1@example.com',
    password: 'password1',
    firstName: 'John',
    lastName: 'Doe',
    role: Role.User,
  },
  {
    email: 'user2@example.com',
    password: 'password2',
    firstName: 'Jane',
    lastName: 'Doe',
    role: Role.Admin,
  },
];
