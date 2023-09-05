import { Popover, Transition } from "@headlessui/react";
import {
  EllipsisHorizontalIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Fragment, useState } from "react";
import { DBReview } from "@/interfaces/database/DBReview";
import EditReviewModal from "./desktop/EditReviewModal";

type Props = {
  isAuthor: boolean;
  review: DBReview;
};

function PopoverReviewActions({ isAuthor, review }: Props) {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const actions = [
    {
      label: "Edit review",
      Icon: PencilIcon,
      visible: isAuthor,
      handleClick: () => setIsEditModalVisible(true),
    },
    {
      label: "Remove review",
      Icon: TrashIcon,
      visible: isAuthor,
      handleClick: () => {},
    },
  ];

  return (
    <>
      <Popover className="relative">
        <Popover.Button className="flex h-10 w-10 items-center justify-center rounded-full duration-75 hover:bg-gray-200 focus:bg-gray-200">
          <EllipsisHorizontalIcon className="w-7 text-gray-600" />
        </Popover.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel className="absolute right-0 z-10 mt-2 translate-y-0.5">
            {({ close }) => (
              <ul className="w-48 rounded-md bg-white p-2 shadow-[0_0_10px_0_rgba(0,0,0,0.1)]">
                {actions.map(({ label, Icon, visible, handleClick }) =>
                  visible ? (
                    <li key={label}>
                      <button
                        className="flex w-full items-center gap-x-2 rounded-md px-2 py-2.5 hover:bg-gray-100 focus:bg-gray-100"
                        type="button"
                        onClick={() => {
                          close();
                          handleClick();
                        }}
                      >
                        <Icon className="w-4 text-gray-500" />
                        <div className="text-sm font-medium">{label}</div>
                      </button>
                    </li>
                  ) : (
                    <></>
                  )
                )}
              </ul>
            )}
          </Popover.Panel>
        </Transition>
      </Popover>
      <EditReviewModal
        review={review}
        isEditModalVisible={isEditModalVisible}
        setIsEditModalVisible={setIsEditModalVisible}
      />
    </>
  );
}

export default PopoverReviewActions;
