export type TodoStatus = 'new' | 'in_progress' | 'complete';

export interface ITodo {
  user: string;
  title: string;
  description: string;
  status: TodoStatus;
}
