export interface ITodo {
  _id: string;
  title: string;
  description?: string;
  status: 'new' | 'in_progress' | 'complete';
}

export interface TodoMutation {
  title: string;
  description?: string;
}