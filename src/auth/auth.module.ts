import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { Prisma } from "@prisma/client";
import { PrismaModule } from "src/prisma/prisma.module";
import { JwtModule } from "@nestjs/jwt";
import { env } from "process";
import { JwtStrategy } from "./strategy";




@Module({
    imports:[JwtModule.register({})],
    controllers: [AuthController],
    providers:[AuthService,JwtStrategy],
})

export class AuthModule {}