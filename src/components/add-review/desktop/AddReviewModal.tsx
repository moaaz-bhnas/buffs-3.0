"use client";

import { useState } from "react";
import getFirstWord from "@/helpers/string/getFirstWord";
import successMessages from "@/utils/messages/successMessages";
import AddReviewForm from "../AddReviewForm";
import SuccessMessage from "@/components/alerts/SuccessMessage";
import Notification from "@/components/notification/Notification";
import ModalContainer from "@/components/modal/ModalContainer";

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

      <ModalContainer
        title="Write a review"
        isOpen={isOpen}
        close={closeModal}
        panelClassName="h-[calc(100vh-2rem)] max-h-[37rem] max-w-2xl"
      >
        <AddReviewForm onSuccess={handleSuccess} />
      </ModalContainer>

      <Notification visible={isSuccess} setIsVisible={setIsSuccess}>
        <SuccessMessage message={successMessages.review} />
      </Notification>
    </>
  );
}

export default AddReviewModal;
