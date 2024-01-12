import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Group } from 'src/group/entities/group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Group])],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
