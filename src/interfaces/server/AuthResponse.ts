import { DBUser } from "../database/User";

export interface AuthResponse {
  sucecss: boolean;
  token: string;
  user: DBUser;
}
