import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserAcc } from './type/type';
import { skipAuth } from 'src/auth/skipAuth';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @skipAuth()
  @Get('read')
  findAll() {
    return this.userService.findAll();
  }

  @Get('read/:id')
  findOneUser(@Param('id') id: string) {
    return this.userService.findOneUser(+id);
  }

  @Post('login')
  checkLogin(id: string, @Body() userAcc: IUserAcc) {
    return this.userService.checkUserLogin(userAcc);
  }



  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(+id, updateUserDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.userService.removeUser(+id);
  }
}
