import { DBReview } from "@/interfaces/database/DBReview";
import ModalContainer from "../modal/ModalContainer";
import MovieDetails from "./MovieDetails";

type Props = {
  isOpen: boolean;
  close: () => void;
  review: DBReview;
};

function CommentModal({ isOpen, close, review }: Props) {
  return (
    <ModalContainer title="Add a comment" isOpen={isOpen} close={close}>
      <MovieDetails review={review} />
    </ModalContainer>
  );
}

export default CommentModal;
