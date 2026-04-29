import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { User, UserSchema } from '../auth/schema/users.schema';

@Module({
  imports: [
    // eslint-disable-next-line prettier/prettier
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }
    ]),
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
