import { UserCreateDto } from 'src/dto/userCreateInput.dto';
import { Role } from '../../src/enums/role.enum';
import * as bcrypt from 'bcrypt';

const hashPassword = bcrypt.hashSync('userAccess101!', 15);

export const usersData: UserCreateDto[] = [
  {
    email: 'user1@example.com',
    password: hashPassword,
    firstName: 'John',
    lastName: 'Doe',
    role: Role.User,
  },
  {
    email: 'user2@example.com',
    password: hashPassword,
    firstName: 'Jane',
    lastName: 'Doe',
    role: Role.Admin,
  },
];
