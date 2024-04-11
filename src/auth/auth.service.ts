import { ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthDto } from "./dto/auth.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { argon2d, argon2i, argon2id } from "argon2";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt";
import { access } from "fs";
import { ConfigService } from "@nestjs/config";
const argon2 = require('argon2');



@Injectable()
export class AuthService {

constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config:ConfigService
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
return this.createToken((await user).id,(await user).email)


       
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

    return this.createToken(user.id,user.email)
    
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

}};



    async createToken(
        userId:Number,email:String
    ):Promise<{acces_token:String}>{
        
        const secret_key = this.config.get('JWT_SECRET');
        const payload ={
            sub:userId,
            email,
        }
        const token = await this.jwtService.signAsync(
            payload,
            {
                expiresIn:'5m',
                secret:secret_key,
            },
        );
        


    return {
        acces_token:token,
    };

    }






















}


