import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ReadUsers implements NestInterceptor {
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {

    return handler.handle().pipe()

    // return handler.handle().pipe(
    //   map((data) => {
    //     // return {
    //     //   message: 'getuser',
    //     //   dt: data.map((item: User) => {
    //     //     const res = {
    //     //       id: item.id,
    //     //       name: item.name,
    //     //       email: item.email,
    //     //       password: item.password,
    //     //       group: item.group,
    //     //       created_at: item.created_at,
    //     //       updated_at: item.updated_at,
    //     //     };
    //     //     return res;
    //     //   }),
    //     // };
    //   }),
    // );
  }
}
