import { SignInDto } from './signIn.dto';

export class SignUpDto implements SignInDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
