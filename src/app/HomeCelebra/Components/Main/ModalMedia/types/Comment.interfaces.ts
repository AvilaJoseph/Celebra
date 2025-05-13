export interface Comment {
  id: number;
  author: string;
  avatar: string;
  text: string;
  date: string;
  likes?: number;
  replies?: number;
}