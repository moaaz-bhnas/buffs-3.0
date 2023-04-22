import { BellIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
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
        <button
          className="w-12 h-12 flex"
          type="button"
          aria-label="Toggle notifications panel"
        >
          <BellIcon className="w-7 m-auto" />
        </button>

        {/* Inbox */}
        <button
          className="w-12 h-12 flex"
          type="button"
          aria-label="Toggle messages panel"
        >
          <PaperAirplaneIcon className="w-7 m-auto" />
        </button>
      </ul>
    </div>
  );
}

export default DesktopNavigation;
