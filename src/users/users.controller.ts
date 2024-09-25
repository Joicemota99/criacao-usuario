import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersModule } from './users.module';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post('user')
  async signUser(
    @Body() userData: {name?: string; email: string},
  ): Promise<CreateUserDto>{
    return this.userService.createUser(userData)
  }
}