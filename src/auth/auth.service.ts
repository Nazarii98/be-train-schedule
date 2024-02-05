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
import { SignInDto } from '../dto/signIn.dto';
import { SignInResponse } from 'src/types/signInResponse.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prismaService: PrismaService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<SignInResponse> {
    const user = await this.usersService.findOne(signInDto.email);

    if (!user) {
      throw new UnauthorizedException();
    }

    const passwordsMatch = await bcrypt.compare(
      signInDto.password,
      user.password,
    );

    if (!passwordsMatch) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: '10m',
      }),
      refresh_token: await this.jwtService.signAsync(payload),
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

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
      refresh_token: await this.jwtService.signAsync(payload, {
        expiresIn: '10m',
      }),
    };
  }
}
