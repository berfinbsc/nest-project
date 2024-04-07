import exp from "constants";
import { AuthService } from "./auth.service";
import { Controller, Post } from "@nestjs/common";


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('login')
    login(){
        return this.authService.login()
    }

    @Post('singin')
    singin(){
        return this.authService.singin()
    }

}