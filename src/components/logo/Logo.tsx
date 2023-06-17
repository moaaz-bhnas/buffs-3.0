import classNames from "@/helpers/style/classNames";
import Image from "next/image";

type Props = {
  className?: string;
};

function Logo({ className = "" }: Props) {
  return (
    <Image
      className={classNames("w-14", className)}
      src="/images/logo/default.png"
      alt=""
      width={0}
      height={0}
      sizes="4rem"
    />
  );
}

export default Logo;
