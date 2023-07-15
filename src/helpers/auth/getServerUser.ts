"server-only";

import { ServerApiClient } from "@/apis/server-api-client";
import { ApiError } from "@/interfaces/api-client/Error";
import { DBUser } from "@/interfaces/database/DBUser";
import { Result, err } from "neverthrow";
import { cookies } from "next/dist/client/components/headers";
import getServerToken from "./getServerToken";

export default async function getServerUser(): Promise<
  Result<DBUser, ApiError>
> {
  // 1. Get token
  const authToken = getServerToken();

  // 2. get user
  const serverApiClient = new ServerApiClient();
  const result = await serverApiClient.getUserByToken(authToken);
  return result;
}
