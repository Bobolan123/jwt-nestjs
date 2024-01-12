import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';  
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { Group } from 'src/group/entities/group.entity';
import { group } from 'console';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const isRole = await this.roleRepository.findOne({where:{url:createRoleDto.url}})
    if (isRole) {
      return {}
    }
    const role: Role = new Role()
    role.url = createRoleDto.url
    role.description = createRoleDto.description
    role.groups = createRoleDto.groupIds.map(id => ({...new Group, id}))

    return this.roleRepository.save(role);
  }


  findAll() {
    return this.roleRepository.find({
      relations: {
        groups:true
      },
      order: {
        id:"ASC"
      }
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  async remove(id: number): Promise<{ affected?: number }> {
    // Find the role to be deleted
    const role = await this.roleRepository.findOne({
      where:{id:id},
      relations: {
        groups:true
      }
    });

    if (!role) {
      // Role not found
      return { affected: 0 };
    }

    // Remove associations in the group_role table
    await this.roleRepository
      .createQueryBuilder()
      .relation(Role, 'groups')
      .of(role)
      .remove(role.groups.map((group) => group.id));

    // Delete the role
    const result = await this.roleRepository.delete(id);

    return result;
  }
}
