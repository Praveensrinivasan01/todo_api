import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from '../models/user.dto';
import { UserEntity } from '../models/user.entity';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from '../models/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwt: JwtService,
  ) {}

  async registerUser(registerDto: UserDto) {
    const { username, password } = registerDto;
    const hashed = await bcrypt.hash(password, 12);
    const salt = await bcrypt.getSalt(hashed);
    const userFound = await this.userRepository.findOneBy({ username });
    {
      if (userFound) {
        throw new UnauthorizedException('Username Already Exists');
      } else {
        const user = new UserEntity();
        user.username = username;
        user.password = hashed;
        user.salt = salt;

        try {
          return this.userRepository.save(user);
        } catch (err) {
          throw new InternalServerErrorException(
            'Something went wrong, User was not created',
          );
        }
      }
    }
  }

  async loginUser(loginDto: LoginDto) {
    const { username, password } = loginDto;

    const user = await this.userRepository.findOneBy({ username });
    if (!user) {
      throw new UnauthorizedException('Username does not exists');
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (isPasswordMatch) {
      const jwtPayLoad = { username };
      const jwtToken = await this.jwt.signAsync(jwtPayLoad, {
        expiresIn: '1d',
      });

      return { token: jwtToken, message: 'login successful' };
    } else {
      throw new UnauthorizedException('Invalid Password');
    }
  }
}
