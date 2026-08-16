export interface CommentItem {
  id: number;
  news_id_fk: number;
  author: string;
  text: string;
}

export type CommentMutation = Omit<CommentItem, "id">;