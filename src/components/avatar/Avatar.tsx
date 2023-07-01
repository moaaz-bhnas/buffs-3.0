import Image from "next/image";

type Props = {
  avatarUrl: string;
  size?: number;
};

function Avatar({ avatarUrl, size = 28 }: Props) {
  return (
    <Image
      className="rounded-full"
      src={avatarUrl}
      alt=""
      width={size}
      height={size}
      sizes="3rem"
    />
  );
}

export default Avatar;
