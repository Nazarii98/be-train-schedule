import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignUpInput } from 'src/types/signUpInput.interface';
import { SignUpResponse } from 'src/types/signUpResponse.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { Role } from 'src/enums/role.enum';
import { SignInDto } from './dto/signInDto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prismaService: PrismaService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<any> {
    const user = await this.usersService.findOne(signInDto.email);
    const hashedPassword = await bcrypt.hash(signInDto.password, 15);

    if (hashedPassword !== user.password) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };
    console.log(payload);

    return {
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: '10m',
      }),
      refreshToken: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(signUpInput: SignUpInput): Promise<SignUpResponse> {
    const { password, email, ...restData } = signUpInput;
    const hashedPassword = await bcrypt.hash(password, 15);
    const checkUser = await this.usersService.findOne(email);

    if (checkUser) {
      throw new HttpException('User exist', 403);
    }

    const user = await this.prismaService.user.create({
      data: {
        password: hashedPassword,
        email,
        role: Role.User,
        ...restData,
      },
    });

    console.log('userCreate', user);

    const payload = { sub: user.id };

    return {
      accessToken: await this.jwtService.signAsync(payload),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: '10m',
      }),
    };
  }
}
