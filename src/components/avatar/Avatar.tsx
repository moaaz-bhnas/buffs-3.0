import classNames from "@/helpers/style/classNames";
import Image from "next/image";

type Props = {
  className?: string;
};

async function Avatar({ className = "" }: Props) {
  // const user = await getCurrentUser();
  // const avatarSrc = user?.image
  //   ? user.image
  //   : "images/avatar/default-avatar.svg";

  return (
    <Image
      className={classNames("w-7 rounded-full", className)}
      src={"images/avatar/default-avatar.svg"}
      alt=""
      width={0}
      height={0}
      sizes="3rem"
    />
  );
}

export default Avatar;
