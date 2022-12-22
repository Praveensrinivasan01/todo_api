import { UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Repository } from 'typeorm';
import { UserEntity } from './models/user.entity';

export class JwtCustomStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secretKey',
    });
  }
  async validate(payLoad: { username: string }) {
    const { username } = payLoad;
    const user = await this.userRepository.findOneBy({ username });
    if (!user) { 
      throw new UnauthorizedException();
    } else {
      return user;
    }
  }
}
