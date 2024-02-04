import { SignInInput } from './signInInput.interface';

export interface SignUpInput extends SignInInput {
  firstName: string;
  lastName: string;
}
