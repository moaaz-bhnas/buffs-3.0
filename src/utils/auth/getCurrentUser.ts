import "server-only";

import { authOptions } from "@/libs/next-auth";
import { Session, getServerSession } from "next-auth";
import { cache } from "react";

console.log({ cache });

const getCurrentUser = cache(async function getCurrentUser(): Promise<
  Session["user"] | undefined
> {
  const session: Session | null = await getServerSession(authOptions);

  return session?.user;
});

export default getCurrentUser;
