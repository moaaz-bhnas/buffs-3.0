import getServerUser from "@/helpers/auth/getServerUser";
import Avatar from "./Avatar";

type Props = { size?: number };

async function UserAvatar({ size }: Props) {
  const userResult = await getServerUser();

  if (userResult.isErr()) {
    return <></>;
  }

  return <Avatar avatarUrl={userResult.value.avatar} size={size} />;
}

export default UserAvatar;
