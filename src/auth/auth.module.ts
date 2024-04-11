import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { Prisma } from "@prisma/client";
import { PrismaModule } from "src/prisma/prisma.module";
import { JwtModule } from "@nestjs/jwt";
import { env } from "process";





@Module({
    imports:[JwtModule.register({
        global:true,
        secret:env.JWT_SECRET,
        signOptions:{
            expiresIn:env.JWT_EXPIRATION
        }
    })],
    controllers: [AuthController],
    providers:[AuthService],
})

export class AuthModule {}