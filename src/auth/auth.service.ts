import { ForbiddenException, Injectable } from "@nestjs/common";
import { AuthDto } from "./dto/auth.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { argon2d, argon2i, argon2id } from "argon2";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
const argon2 = require('argon2');



@Injectable()
export class AuthService {

constructor(private prisma: PrismaService){}

    async login(dto: AuthDto){
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
                throw new ForbiddenException(
                    'password is incorrect'
                );
             }


return user;
       
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