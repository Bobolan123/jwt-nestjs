import { IsNotEmpty, IsString } from "class-validator";

export class CreateRoleDto {
    @IsString()
    @IsNotEmpty()
    url:string;

    @IsString()
    description:string

    groupIds:any[]
}
