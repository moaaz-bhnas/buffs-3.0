"use client";

import { Popover, Transition } from "@headlessui/react";
import {
  ArrowLeftOnRectangleIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { signOut } from "next-auth/react";

type Props = {};

function SettingsPopover({}: Props) {
  return (
    <Popover className="relative">
      <Popover.Button className="flex h-12 w-12 items-center justify-center rounded-full duration-75 hover:bg-gray-200 focus:bg-gray-200">
        <ChevronDownIcon className="w-7" />
      </Popover.Button>

      <Transition>
        <Popover.Panel
          as="ul"
          className="panel right-0 z-10 w-40 translate-y-2"
        >
          <li>
            <button
              className="menu-item flex w-full items-center"
              type="button"
              onClick={() => signOut()}
            >
              <ArrowLeftOnRectangleIcon className="me-3 w-7 rounded-full bg-gray-200 p-1 text-gray-600" />
              <span className="font-medium">Log out</span>
            </button>
          </li>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}

export default SettingsPopover;
