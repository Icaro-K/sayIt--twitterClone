import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ require: true, unique: [true, 'Email já cadastrado'] })
  email: string;

  @Prop({ require: true })
  password: string;

  @Prop({ require: true, unique: [true, 'Username já cadastrado'] })
  username: string;

  @Prop({ require: true })
  name: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
