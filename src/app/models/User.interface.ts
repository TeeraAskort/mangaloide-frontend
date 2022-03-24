import { Chapter } from './Chapter.interface';
import { Comic } from './Comic.interface';
export interface User {
  id: number;
  name: string;
  comicsFollowing: Comic[];
  chaptersRead: Chapter[];
}
