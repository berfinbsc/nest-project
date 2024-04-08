import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { identity } from "rxjs";


export class AuthDto {

    

    @IsEmail()
    @IsNotEmpty()
    email: string ;

    @IsString()
    @IsNotEmpty()
    password: string;
}


