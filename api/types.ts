import { Document, Model, Types } from 'mongoose';
import { Request } from "express";

export type TodoStatus = 'new' | 'in_progress' | 'complete';

export interface UserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

export interface IUser extends Document {
  username: string;
  password: string;
  token: string;
}

export interface ITodo {
  user: Types.ObjectId;
  title: string;
  description?: string;
  status: TodoStatus;
}

export type UserModel = Model<IUser, {}, UserMethods>;

export interface RequestWithUser extends Request {
  user?: IUser;
}