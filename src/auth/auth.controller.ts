import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { LoginDto } from './models/login.dto';
import { UserDto } from './models/user.dto';
import { AuthService } from './service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }


  @Post('register')
  registerUser(@Body(ValidationPipe) user: UserDto) {
    return this.authService.registerUser(user);
  }


  @Post('login')
  signIn(@Body(ValidationPipe) loginDto: LoginDto) {
    return this.authService.loginUser(loginDto);
  }
}
