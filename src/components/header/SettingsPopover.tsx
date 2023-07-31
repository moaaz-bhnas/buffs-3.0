"use client";

import { ServerApiClient } from "@/apis/server-api-client";
import { Popover, Transition } from "@headlessui/react";
import {
  ArrowLeftOnRectangleIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { useRouter } from "next/navigation";
import { useAsyncFn } from "react-use";
// import Notification from "../notification/Notification";
import { useState } from "react";
import ErrorMessage from "../alerts/ErrorMessage";
import errorMessages from "@/utils/messages/errorMessages";
import AnimatedSpinner from "../spinner/AnimatedSpinner";

type Props = {};

const serverApiClient = new ServerApiClient();

function SettingsPopover({}: Props) {
  const router = useRouter();

  const [isSignoutError, setIsSignoutError] = useState(false);

  const [handleSignoutState, handleSignout] = useAsyncFn(async () => {
    const result = await serverApiClient.signout();

    if (result.isErr()) {
      setIsSignoutError(true);
      throw new Error(result.error.errorMessage);
    }

    router.push("/signin");
  });

  return (
    <Popover className="relative">
      <Popover.Button className="flex h-12 w-12 items-center justify-center rounded-full duration-75 hover:bg-gray-200 focus:bg-gray-200">
        <ChevronDownIcon className="w-7" />
      </Popover.Button>

      <Transition>
        <Popover.Panel
          as="ul"
          className="panel right-0 z-10 w-44 translate-y-2"
        >
          <li>
            <button
              className="menu-item flex w-full items-center"
              type="button"
              onClick={handleSignout}
            >
              <ArrowLeftOnRectangleIcon className="me-3 w-7 rounded-full bg-gray-200 p-1 text-gray-600" />
              <span className="me-auto font-medium">Log out</span>
              <AnimatedSpinner
                loading={handleSignoutState.loading}
                className="h-5 w-5 fill-gray-800"
              />
            </button>
          </li>
        </Popover.Panel>
      </Transition>

      {/* <Notification visible={isSignoutError} setIsVisible={setIsSignoutError}>
        <ErrorMessage message={errorMessages.somthingWentWrong} />
      </Notification> */}
    </Popover>
  );
}

export default SettingsPopover;
