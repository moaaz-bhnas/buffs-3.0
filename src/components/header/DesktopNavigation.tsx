import {
  BellIcon,
  ChevronDownIcon,
  PaperAirplaneIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import SearchForm from "./SearchForm";

type Props = {};

function DesktopNavigation({}: Props) {
  return (
    <div className="flex items-center gap-x-3.5">
      {/* Search bar */}
      <div className="flex-1">
        <SearchForm />
      </div>

      <ul className="flex gap-x-1 -me-2.5">
        {/* Notifications */}
        <li>
          <button
            className="w-12 h-12 flex"
            type="button"
            aria-label="Toggle notifications panel"
          >
            <BellIcon className="w-7 m-auto" />
          </button>
        </li>

        {/* Inbox */}
        <li>
          <button
            className="w-12 h-12 flex"
            type="button"
            aria-label="Toggle messages panel"
          >
            <PaperAirplaneIcon className="w-7 m-auto" />
          </button>
        </li>

        {/* Profile */}
        <li>
          <button
            className="w-12 h-12 flex items-center justify-center"
            type="button"
            aria-label="Toggle profile settings"
          >
            <UserIcon className="w-7" />
            <ChevronDownIcon className="w-3.5" />
          </button>
        </li>
      </ul>
    </div>
  );
}

export default DesktopNavigation;
