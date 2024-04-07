import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() //this will make the PrismaService available to all modules 
@Module({
  providers: [PrismaService],
  exports: [PrismaService]
})
export class PrismaModule {}
