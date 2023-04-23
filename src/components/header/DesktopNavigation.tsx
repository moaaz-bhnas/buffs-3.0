import {
  BellIcon,
  ChevronDownIcon,
  PaperAirplaneIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import SearchForm from "./SearchForm";
import { authOptions, getCurrentUser } from "@/lib/next-auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

type Props = {};

async function DesktopNavigation({}: Props) {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  return (
    <div className="flex items-center gap-x-3">
      {/* Search bar */}
      <div className="flex-1">
        <SearchForm />
      </div>

      <ul className="-me-2.5 flex gap-x-1">
        {/* Notifications */}
        <li>
          <button
            className="flex h-12 w-12 items-center justify-center rounded-full duration-75 hover:bg-gray-200 focus:bg-gray-200"
            type="button"
            aria-label="Toggle notifications panel"
          >
            <BellIcon className="w-7" />
          </button>
        </li>

        {/* Inbox */}
        <li>
          <button
            className="flex h-12 w-12 items-center justify-center rounded-full duration-75 hover:bg-gray-200 focus:bg-gray-200"
            type="button"
            aria-label="Toggle messages panel"
          >
            <PaperAirplaneIcon className="w-7" />
          </button>
        </li>

        {/* Profile */}
        <li>
          <Link
            href="/profile"
            className="flex h-12 w-12 items-center justify-center rounded-full duration-75 hover:bg-gray-200 focus:bg-gray-200"
            aria-label="Your profile page"
          >
            <Image
              className="w-7 rounded-full"
              src={user.image ? user.image : "Placeholder"}
              alt=""
              width={0}
              height={0}
              sizes="2rem"
            />
          </Link>
        </li>

        {/* Settings */}
        <li>
          <button
            className="flex h-12 w-12 items-center justify-center rounded-full duration-75 hover:bg-gray-200 focus:bg-gray-200"
            type="button"
            aria-label="Toggle settings panel"
          >
            <ChevronDownIcon className="w-7" />
          </button>
        </li>
      </ul>
    </div>
  );
}

export default DesktopNavigation;
