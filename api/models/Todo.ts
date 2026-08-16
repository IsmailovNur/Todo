import { model, Schema, Types } from "mongoose";
import { ITodo } from "../types";

const TodoSchema = new Schema({
  user: {
    type: Types.ObjectId,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: 'in_progress',
  }
})

export const Todo = model<ITodo>('Todo', TodoSchema);