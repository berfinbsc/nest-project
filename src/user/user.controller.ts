import { Body, Controller, Get, Patch, UseGuards } from "@nestjs/common";
import { User } from "@prisma/client";
import { GetUser } from "src/auth/decorator/get-user.decorator";
import { JwtGuard } from "src/auth/guard/jwt.guard";


@UseGuards(JwtGuard)
@Controller('user')
export class UserController{

@Get('me')
//@GetUser kimlik doğrulaması => return user=>user:User
getUser(@GetUser() user: User){

    return user;
}

@Patch()
editUser(
  @GetUser('id') userId: number,
  @Body() dto: EditUserDto,
) {
  return this.userService.editUser(userId, dto);
}






}