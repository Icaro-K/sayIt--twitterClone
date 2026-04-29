import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';

@Schema({versionKey: false, timestamps: true})
export class RefreshToken extends Document {
  @Prop({ required: true, type: mongoose.Types.ObjectId })
  userId: mongoose.Types.ObjectId;
  @Prop({ required: true })
  token: string;
  @Prop({ required: true })
  expiresAt: Date;
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);
