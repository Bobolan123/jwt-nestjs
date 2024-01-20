import { IsEnum, IsNotEmpty } from "class-validator";
import { User } from "src/user/entities/user.entity";

export class CreateGroupDto {
    @IsNotEmpty()
    @IsEnum(['dev', 'user', 'admin'])
    name:'dev' | 'user' | 'admin' 

    users: User[]

    roleIds:number[]
}
