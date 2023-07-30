import { DBUser } from "../database/DBUser";

export interface AuthResponse {
  sucecss: boolean;
  token: string;
  user: DBUser;
}
