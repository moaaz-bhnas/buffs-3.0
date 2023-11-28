"use client";

import {
  ChatBubbleOvalLeftIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { useAsyncFn } from "react-use";
import { ServerApiClient } from "@/apis/server-api-client";
import { DBReview } from "@/interfaces/database/DBReview";
import { DBUser } from "@/interfaces/database/DBUser";
import classNames from "@/helpers/style/classNames";
import { Dispatch, SetStateAction, useState } from "react";
import ModalContainer from "../modal/ModalContainer";
import LikesModal from "./LikesModal";
import CommentModal from "./CommentModal";

type Props = {
  user: DBUser;
  review: DBReview;
};

const serverApiClient = new ServerApiClient();

function ReviewInteractions({ user, review }: Props) {
  /**
   * Like functionality
   */
  const [likers, setLikers] = useState(review.likers);
  const isLiked = likers.includes(user._id);
  const [isLikesModalVisible, setIsLikesModalVisible] = useState(false);
  const [handleLikeState, handleLike] = useAsyncFn(
    async (
      userId: string,
      reviewId: string,
      setLikers: Dispatch<SetStateAction<string[]>>
    ) => {
      // 1. update local state till the updated data comes from Socket.io
      setLikers((prevLikers) => {
        let newLikers;
        if (prevLikers.includes(userId)) {
          newLikers = prevLikers.filter((liker) => liker !== userId);
        } else {
          newLikers = prevLikers.concat([userId]);
        }
        return newLikers;
      });

      // 2. send a like request to the server
      const result = await serverApiClient.likeReview(reviewId);
      if (result.isErr()) {
        throw new Error(result.error.errorMessage);
      }
    }
  );

  /**
   * Comment functionality
   */
  const [isCommentModalVisible, setIsCommentModalVisible] = useState(false);

  const interactions = [
    {
      label: "Like",
      iconClassName: isLiked ? "animate-pop fill-red-600 stroke-red-600" : "",
      buttonClassName:
        !isLiked && !handleLikeState.loading ? "hover:opacity-60" : "",
      IconCompomemt: HeartIcon,
      onClick: () => handleLike(user._id, review._id, setLikers),
      disabled: handleLikeState.loading,
    },
    {
      label: "Comment",
      iconClassName: "",
      buttonClassName: "hover:opacity-60",
      IconCompomemt: ChatBubbleOvalLeftIcon,
      onClick: () => setIsCommentModalVisible(true),
      disabled: false,
    },
    {
      label: "Send",
      iconClassName: "",
      buttonClassName: "hover:opacity-60",
      IconCompomemt: PaperAirplaneIcon,
      onClick: () => {},
      disabled: false,
    },
  ];

  return (
    <div className="space-y-2">
      {/* likes panel */}
      {likers.length > 0 && (
        <button
          className="font-semibold"
          type="button"
          onClick={() => setIsLikesModalVisible(true)}
        >
          {likers.length} {likers.length === 1 ? "like" : "likes"}
        </button>
      )}
      <LikesModal
        isOpen={isLikesModalVisible}
        close={() => setIsLikesModalVisible(false)}
        likers={likers}
      />

      <hr />

      {/* Interactions list */}
      <ul className="flex justify-between">
        {/* Like */}
        {interactions.map((interaction) => (
          <li>
            <button
              className={classNames(
                "flex items-center justify-center gap-x-1.5 p-0 transition-opacity",
                interaction.buttonClassName
              )}
              type="button"
              onClick={interaction.onClick}
              disabled={interaction.disabled}
            >
              <interaction.IconCompomemt
                className={classNames(
                  "h-auto w-6 transition-all",
                  interaction.iconClassName
                )}
              />
              {interaction.label}
            </button>
          </li>
        ))}
      </ul>

      {/* Comment Modal */}
      <CommentModal
        isOpen={isCommentModalVisible}
        close={() => setIsCommentModalVisible(false)}
        review={review}
      />
    </div>
  );
}

export default ReviewInteractions;
