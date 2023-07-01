import { ServerApiClient } from "@/apis/server-api-client";
import { cookies } from "next/dist/client/components/headers";
import Avatar from "./Avatar";

type Props = { size?: number };

const serverApiClient = new ServerApiClient();

async function UserAvatar({ size }: Props) {
  const authToken = cookies().get("token")?.value;
  const userResult = await serverApiClient.getUserByToken(authToken || "");

  if (userResult.isErr()) {
    return <></>;
  }

  return <Avatar avatarUrl={userResult.value.avatar} size={size} />;
}

export default UserAvatar;
