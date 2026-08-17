import { model, Schema, Types } from "mongoose";
import { ITodo } from "../types";

const TodoSchema = new Schema<ITodo>({
  user: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    enum: ['new', 'in_progress', 'complete'],
    required: true,
    default: 'new',
  },
})

export const Todo = model<ITodo>('Todo', TodoSchema);