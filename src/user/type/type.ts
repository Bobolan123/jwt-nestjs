import { User } from "../entities/user.entity";

export interface IReturn {
    EM: string;
    EC: number;
    DT: {}
}


export interface IUserAcc {
    email:string,
    password:string
  }