import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment, ReactNode } from "react";

type Props = {
  title: string;
  isOpen: boolean;
  close(): void;
  children: ReactNode;
};

function ModalContainer({ title, isOpen, close, children }: Props) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={close}>
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
          <div className="flex min-h-full items-center justify-center p-3">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative w-full max-w-xl transform space-y-4 overflow-auto rounded-md bg-white p-4 pt-2 text-left align-middle shadow-xl transition-all">
                {/* header */}
                <div className="flex items-center justify-between border-b">
                  <h2 className="font-semibold">{title}</h2>
                  <button
                    className="bg-gray-20 flex h-10 w-10 rounded-full transition hover:bg-gray-300 focus:bg-gray-300"
                    type="button"
                    onClick={close}
                  >
                    <XMarkIcon className="m-auto w-6" />
                  </button>
                </div>

                {/* form */}
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default ModalContainer;
