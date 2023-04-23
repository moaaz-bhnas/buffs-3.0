import Link from "next/link";
import {
  BellIcon,
  MagnifyingGlassIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";

type Props = {};

const navigationLinks = [
  {
    label: "Search",
    href: "/search",
    Icon: MagnifyingGlassIcon,
  },
  {
    label: "Notifications",
    href: "/notifications",
    Icon: BellIcon,
  },
  {
    label: "Inbox",
    href: "/inbox",
    Icon: PaperAirplaneIcon,
  },
];

function MobileNavigation({}: Props) {
  return (
    <ul className="flex gap-x-1 -me-2.5">
      {/* (-me-2.5) to align the end of the last icon with content below */}
      {navigationLinks.map(({ label, href, Icon }) => (
        <li key={label}>
          <Link className="w-12 h-12 flex" aria-label={label} href={href}>
            <Icon className="w-7 m-auto" />
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default MobileNavigation;
