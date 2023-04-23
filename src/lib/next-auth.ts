import { cache } from "react";
import { AuthOptions, Session, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import mongoClientPromise from "./mongodb";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  adapter: MongoDBAdapter(mongoClientPromise),
  session: {
    strategy: "jwt",
  },
};

export const getCurrentUser = cache(async function getCurrentUser(): Promise<
  Session["user"] | null
> {
  const session: Session | null = await getServerSession(authOptions);

  if (session?.user) return session.user;
  else return null;
});
