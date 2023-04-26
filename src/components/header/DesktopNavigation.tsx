import {
  BellIcon,
  ChevronDownIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import SearchForm from "./SearchForm";
import Link from "next/link";
import Avatar from "../avatar/Avatar";
import { Suspense } from "react";
import AvatarSkeleton from "../avatar/AvatarSkeleton";
import SettingsPopover from "./SettingsPopover";

type Props = {};

function DesktopNavigation({}: Props) {
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
            <Suspense fallback={<AvatarSkeleton />}>
              {/* @ts-expect-error Async Server Component */}
              <Avatar />
            </Suspense>
          </Link>
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