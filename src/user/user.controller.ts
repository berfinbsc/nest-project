import { Controller, Get, UseGuards } from "@nestjs/common";
import { JwtGuard } from "src/auth/guard/jwt.guard";


@UseGuards(JwtGuard)
@Controller('user')
export class UserController{

@Get('me')
getUser(){

    return {
        msg :'jwt guard working'
    }
}

}