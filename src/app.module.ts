import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { RoleModule } from './role/role.module';
import { Role } from './role/entities/role.entity';
import { GroupModule } from './group/group.module';
import { Group } from './group/entities/group.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'andhungbui00',
      username: 'postgres',
      entities: [User, Role, Group, ],
      database: 'postgres',
      synchronize: true,
      logging: true,
    }),
    UserModule,
    RoleModule,
    GroupModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}