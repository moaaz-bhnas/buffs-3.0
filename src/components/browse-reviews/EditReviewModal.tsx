import { Dispatch, SetStateAction, useState } from "react";
import SuccessMessage from "@/components/alerts/SuccessMessage";
import EditReviewForm from "@/components/edit-reviews/EditReviewForm";
import ModalContainer from "@/components/modal/ModalContainer";
import { DBReview } from "@/interfaces/database/DBReview";
import Notification from "@/components/notification/Notification";
import successMessages from "@/utils/messages/successMessages";

type Props = {
  review: DBReview;
  isEditModalVisible: boolean;
  setIsEditModalVisible: Dispatch<SetStateAction<boolean>>;
  userDisplayName: string;
};

function EditReviewModal({
  review,
  isEditModalVisible,
  setIsEditModalVisible,
  userDisplayName,
}: Props) {
  const [isSuccess, setIsSuccess] = useState(false);

  function handleSuccess() {
    setIsSuccess(true);
    setIsEditModalVisible(false);
  }

  return (
    <>
      <ModalContainer
        title="Edit Review"
        isOpen={isEditModalVisible}
        close={() => setIsEditModalVisible(false)}
      >
        <EditReviewForm
          review={review}
          onSuccess={handleSuccess}
          userDisplayName={userDisplayName}
        />
      </ModalContainer>

      <Notification visible={isSuccess} setIsVisible={setIsSuccess}>
        <SuccessMessage message={successMessages.editReview} />
      </Notification>
    </>
  );
}

export default EditReviewModal;
