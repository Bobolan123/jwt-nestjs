import { Injectable, Param } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { Repository } from 'typeorm';
import { Role } from 'src/role/entities/role.entity';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group) private readonly groupRepository: Repository<Group>,
  ) {}

  async create(createGroupDto: CreateGroupDto) {
    const name = createGroupDto.name;
  
    // Using findOne instead of find to get a single result or null
    const existingGroup = await this.groupRepository.findOne({
      where: { name: name },
    });
  
    if (existingGroup) {
      const roles = createGroupDto.roleIds.map((id) => ({ ...new Role(), id }));
      
      // Update the existing group
      existingGroup.roles = roles;
      
      return this.groupRepository.save(existingGroup);
    }
  
    // Create a new group
    const group: Group = new Group();
    group.name = name;
    group.roles = createGroupDto.roleIds.map((id) => ({ ...new Role(), id }));
  
    return this.groupRepository.save(group);
  }
  

  exist(name:'user'|'admin'|'dev') {
    const isGroup = this.groupRepository.find({
    where: {name:name}
    })
    if (isGroup) {
      
    }
  }

  findAll() {
    return this.groupRepository.find({
      relations:{
        roles:true
      }
    })
  }
  findOne(id:number) {
    return this.groupRepository.findOne({
      where:{id:id},
      relations:{
        roles:true
      }
    })
  }

  async remove(id: number): Promise<{ affected?: number }> {
    // Find the role to be deleted
    const group = await this.groupRepository.findOne({
      where:{id:id},
      relations: {
        roles:true
      }
    });

    if (!group) {
      // Role not found
      return { affected: 0 };
    }

    // Remove associations in the group_role table
    await this.groupRepository
      .createQueryBuilder()
      .relation(Role, 'groups')
      .of(group)
      .remove(group.roles.map((group) => group.id));

    // Delete the role
    const result = await this.groupRepository.delete(id);

    return result;
  }

}
