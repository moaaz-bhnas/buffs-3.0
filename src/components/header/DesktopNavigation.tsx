import { BellIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

type Props = {};

function DesktopNavigation({}: Props) {
  return (
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
  );
}

export default DesktopNavigation;
