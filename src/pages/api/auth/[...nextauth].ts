import { authOptions } from "@/libs/next-auth";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);

export default handler;
