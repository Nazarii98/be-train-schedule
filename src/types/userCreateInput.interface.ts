import { Role } from 'src/enums/role.enum';

export interface UserCreateInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: Role;
}
