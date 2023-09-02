"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef, useState } from "react";
import getFirstWord from "@/helpers/string/getFirstWord";
import successMessages from "@/utils/messages/successMessages";
import AddReviewForm from "../AddReviewForm";
import SuccessMessage from "@/components/alerts/SuccessMessage";
import Notification from "@/components/notification/Notification";
import { XMarkIcon } from "@heroicons/react/24/outline";

type Props = { userDisplayName: string };

function AddReviewModal({ userDisplayName }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function handleSuccess() {
    setIsSuccess(true);
    closeModal();
  }

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="h-full w-full rounded-2xl bg-gray-200 px-4 text-start text-gray-500"
      >
        Want to review a movie, {getFirstWord(userDisplayName)}?
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-3 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="h-[43rem] w-full max-w-xl transform space-y-4 overflow-auto rounded-md bg-white p-4 pt-2 text-left align-middle shadow-xl transition-all">
                  {/* header */}
                  <div className="flex items-center justify-between border-b">
                    <h2 className="font-semibold">Write a review</h2>
                    <button
                      className="bg-gray-20 flex h-10 w-10 rounded-full transition hover:bg-gray-300 focus:bg-gray-300"
                      type="button"
                      onClick={closeModal}
                    >
                      <XMarkIcon className="m-auto w-6" />
                    </button>
                  </div>

                  {/* form */}
                  <AddReviewForm onSuccess={handleSuccess} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <Notification visible={isSuccess} setIsVisible={setIsSuccess}>
        <SuccessMessage message={successMessages.review} />
      </Notification>
    </>
  );
}

export default AddReviewModal;
