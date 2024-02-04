import { UserCreateDto } from 'src/dto/userCreateInput.dto';
import { Role } from '../../src/enums/role.enum';
import * as bcrypt from 'bcrypt';

export const usersData: UserCreateDto[] = [
  {
    email: 'user1@example.com',
    password: bcrypt.hash('password1', 15),
    firstName: 'John',
    lastName: 'Doe',
    role: Role.User,
  },
  {
    email: 'user2@example.com',
    password: bcrypt.hash('password2', 15),
    firstName: 'Jane',
    lastName: 'Doe',
    role: Role.Admin,
  },
];
