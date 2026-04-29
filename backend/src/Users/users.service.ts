import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../auth/schema/users.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  create(data) {
    return this.userModel.create(data);
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }
}
