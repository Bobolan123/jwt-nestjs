import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsString,
    Matches,
    MinLength,
  } from 'class-validator';
  
  const passwordRegEx =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{3,20}$/;
  
  export class CreateUserDto {
    @IsString()
    @MinLength(2, { message: 'Name must have atleast 2 characters.' })
    @IsNotEmpty()
    name: string;
  
    @IsNotEmpty()
    @IsEmail(null, { message: 'Please provide valid Email.' })
    email: string;
  
    @IsString()
    @IsEnum(['user', 'admin', 'dev'])
    role:string;
    // @IsString()
    // @IsEnum(['f', 'm', 'u'])
    // gender: string;
  
    @IsNotEmpty()
    @Matches(passwordRegEx, {
      message: `Password must contain Minimum 3 and maximum 20 characters, 
      at least one uppercase letter, 
      one lowercase letter, 
      one number and 
      one special character`,
    })
    password: string;
  }