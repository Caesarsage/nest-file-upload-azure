import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FileModule } from '../files/file.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), FileModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
