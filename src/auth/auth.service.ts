import { Injectable } from "@nestjs/common";



@Injectable({})
export class AuthService {

    login(){
        return {
            message: "Login Successful"
        }
    };
    singin(){
        return {
            message: "Singin Successful"
        }
    };
}