import bcrypt from 'bcrypt';
import { model, Schema } from "mongoose";
import { IUser, UserMethods, UserModel } from "../types";

const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema<IUser, UserModel, UserMethods>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  }
});

UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.set('toJSON', {
  transform: (doc, ret: Partial<IUser>) => {
    delete ret.password;
    return ret;
  },
});

UserSchema.methods.checkPassword = function (password: string) {
  return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function () {
  this.token = crypto.randomUUID();
};

export const User = model<IUser, UserModel>('User', UserSchema);