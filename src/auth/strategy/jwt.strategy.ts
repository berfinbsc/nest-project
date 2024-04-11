import { Injectable } from '@nestjs/common';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import {ExtractJwt, Strategy,} from 'passport-jwt';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt',) {

    constructor(){
        super();
    }
}
