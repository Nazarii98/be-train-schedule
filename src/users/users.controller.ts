import {
  Controller,
  Get,
  Headers,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  @Get('currentUser')
  async getCurrentUser(
    @Headers('authorization') authorizationHeader: string,
  ): Promise<UserDto> {
    if (!authorizationHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    const token = authorizationHeader.replace('Bearer ', '');

    try {
      const decodedToken = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      console.log(decodedToken);

      const userEmail = decodedToken.email;

      return this.usersService.findOne(userEmail);
    } catch (error) {
      console.error('JWT validation error:', error.message);
      throw new UnauthorizedException('Invalid token');
    }
  }
}
