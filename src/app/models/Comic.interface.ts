import { Chapter } from './Chapter.interface';

export interface Comic {
  id: number;
  name: string;
  author: string;
  finished: boolean;
  nsfw: boolean;
  chapters: Chapter[];
}
