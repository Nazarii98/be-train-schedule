import { User } from '@prisma/client';

export class UserDto implements Omit<User, 'password'> {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}
