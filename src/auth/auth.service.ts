import { ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthDto } from "./dto/auth.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { argon2d, argon2i, argon2id } from "argon2";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt";
import { access } from "fs";
const argon2 = require('argon2');



@Injectable()
export class AuthService {

constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
){}

    async login(dto: AuthDto){
        //this prisma connects to db and gets the user with the email
        const user = this.prisma.user.findFirst({
            where: {
                email: dto.email
            }
        });

        if(!user){   
                throw new ForbiddenException(
                    'user not found'
                );
             }       

        const isMatch = await argon2.verify (
             (await user).hash,
             dto.password
            );

            if(!isMatch){
                throw new UnauthorizedException();
             }
return {
    access_token:await this.jwtService.signAsync({
 sub: (await user).id,
 email: (await user).email,
    })
}


       
    };















    
    async singin(dto: AuthDto){
try {
    
    const hash = await argon2.hash(dto.password);
    const user = await this.prisma.user.create({
        data: {
            email: dto.email,
            hash: hash
        }
    });

    return user;
    
} catch (error) {
    
    if(error instanceof 
        PrismaClientKnownRequestError){
        if(error.code === 'P2002'){
            throw new ForbiddenException(
                'user already exists'
            );
        }
    }
    throw error;

}
       


    };
}