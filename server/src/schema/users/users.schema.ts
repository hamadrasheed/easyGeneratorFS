import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

export interface UserI {
  _id: string;
  name: string;
  email: string;
  password: string;
}

@Schema()
export class User {
  
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

}

export const UserSchema = SchemaFactory.createForClass(User);