import { Users } from "./Users";
import { Movies } from "./Movies";

export interface Ratings {
  user_id?: number;
  show_id?: string;
  rating?: number;

  User?: Users;
  Title?: Movies;
}
