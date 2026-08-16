export interface NewsItem {
  id: number;
  title: string;
  image: string | null;
  publish_date: string;
}

export interface FullNewsItem extends NewsItem {
  text_content: string;
}
export interface NewsMutation {
  title: string;
  text_content: string;
  image: File | null;
}