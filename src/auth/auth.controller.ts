import exp from "constants";
import { AuthService } from "./auth.service";
import { Body, Controller, Post } from "@nestjs/common";
import { AuthDto } from "./dto/auth.dto";


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('login')
    login(@Body() authDto: AuthDto){
        return this.authService.login()
    }

    @Post('singin')
    singin(){
        return this.authService.singin()
    }

}