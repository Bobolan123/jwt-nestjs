import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';

@Controller('api/group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post('create')
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.create(createGroupDto);
  }

  @Get('read')
  findAll() {
    return this.groupService.findAll();
  }

  @Get('read/:id')
  findOne(@Param('id') id:string) {
    return this.groupService.findOne(+id);
  }


  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.groupService.remove(+id);
  }
}
