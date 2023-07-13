import Link from "next/link";
import Container from "../container/Container";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

type Props = {
  title: string;
};

function SubpageHeader({ title }: Props) {
  return (
    <header className="border-b bg-white py-1 shadow-sm">
      <h1 className="sr-only">Buffs</h1>

      <Container className="!py-0">
        <nav aria-label="main" className="flex items-center gap-x-2">
          <Link href={"/"} className="p-3">
            <ArrowLeftIcon className="w-6" />
          </Link>

          <h2 className="title-1">{title}</h2>
        </nav>
      </Container>
    </header>
  );
}

export default SubpageHeader;
