import { DBUser } from "../database/User";

export interface GetUserByTokenResponse {
  success: boolean;
  data: DBUser;
}
