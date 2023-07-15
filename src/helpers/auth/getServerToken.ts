"server-only";

import { cookies } from "next/dist/client/components/headers";

export default function getServerToken(): string {
  const authToken = cookies().get("token")?.value;

  if (!authToken) {
    throw new Error(
      `Token cookie doesn't exist. Make sure you set the token after signin/signup`
    );
  }

  return authToken;
}
