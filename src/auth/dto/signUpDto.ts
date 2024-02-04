import { SignInDto } from './signInDto';

export class SignUpDto implements SignInDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
