import { Module } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { UserController } from './user.controller';

@Module({
    controllers:[UserController]
})
export class UserModule {

}
