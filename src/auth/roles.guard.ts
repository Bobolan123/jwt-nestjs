import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const user = request.user; // get from JWtAuthgurd that is applied global in app module
    const endpoint: string = request.originalUrl;

    if (endpoint.includes('login')) {
      return true
    }

    const userData = await this.userService.findOneUserEmail(user.email);
    const roles = userData.group.roles;

    if (userData.group.name === 'admin') {
      return true
    }

    const checkRole = roles.some((role) => endpoint.includes(role.url));
    return checkRole;
  }
}
