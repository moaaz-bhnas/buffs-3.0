import Image from "next/image";
import Link from "next/link";

type Props = {};

function Logo({}: Props) {
  return (
    <Link href="/">
      <Image
        className="w-14"
        src="/images/logo/default.png"
        alt=""
        width={0}
        height={0}
        sizes="4rem"
      />
    </Link>
  );
}

export default Logo;
