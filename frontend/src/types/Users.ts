import { Ratings } from "./Ratings";

export interface User {
  user_id: number;
  name?: string;
  phone?: string;
  email?: string;
  password?: string;
  age?: number;
  gender?: string;
  Netflix?: number;
  AmazonPrime?: number;
  DisneyPlus?: number;
  ParamountPlus?: number;
  Max?: number;
  Hulu?: number;
  AppleTVPlus?: number;
  Peacock?: number;
  city?: string;
  state?: string;
  zip?: number;

  Ratings?: Ratings[];
}
