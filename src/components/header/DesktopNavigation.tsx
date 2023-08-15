import { BellIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import SearchForm from "./SearchForm";
import Link from "next/link";
import { Suspense } from "react";
import AvatarSkeleton from "../avatar/AvatarSkeleton";
import SettingsPopover from "./SettingsPopover";
import UserAvatar from "../avatar/UserAvatar";
import getServerUser from "@/helpers/auth/getServerUser";

type Props = {};

async function DesktopNavigation({}: Props) {
  const userResult = await getServerUser();

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
          {userResult.isOk() && (
            <Link
              href={`/${userResult.value.username}`}
              className="flex h-12 w-12 items-center justify-center rounded-full duration-75 hover:bg-gray-200 focus:bg-gray-200"
              aria-label="Your profile page"
            >
              <Suspense fallback={<AvatarSkeleton />}>
                {/* @ts-expect-error Async Server Component */}
                <UserAvatar />
              </Suspense>
            </Link>
          )}
        </li>

        {/* Settings */}
        <li>
          <SettingsPopover />
        </li>
      </ul>
    </div>
  );
}

export default DesktopNavigation;
