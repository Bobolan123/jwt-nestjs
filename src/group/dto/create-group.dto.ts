import { IsEnum, IsNotEmpty } from "class-validator";

export class CreateGroupDto {
    @IsNotEmpty()
    @IsEnum(['dev', 'user', 'admin'])
    name:'dev' | 'user' | 'admin' 

    roleIds:number[]
}
