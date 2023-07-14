import { DBUser } from "../database/DBUser";

export interface GetUserByTokenResponse {
  success: boolean;
  data: DBUser;
}
