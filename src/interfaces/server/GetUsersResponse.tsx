import { DBUser } from "../database/User";

export interface GetUsersResponse {
  success: boolean;
  count: number;
  pagination: {
    [key: string]: {
      page: number;
      limit: number;
    };
  };
  data: DBUser[];
}
