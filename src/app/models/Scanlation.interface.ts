import { Comic } from './Comic.interface';
import { User } from './User.interface';
export interface Scanlation {
  id: number;
  users: User[];
  comics: Comic[];
}
