"use client";

import { HeartIcon } from "@heroicons/react/24/outline";
import { useAsyncFn } from "react-use";
import { ServerApiClient } from "@/apis/server-api-client";
import { DBReview } from "@/interfaces/database/DBReview";
import { DBUser } from "@/interfaces/database/DBUser";
import classNames from "@/helpers/style/classNames";
import { Dispatch, SetStateAction, useState } from "react";
import ModalContainer from "../modal/ModalContainer";

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

  return (
    <div>
      {/* Interactions list */}
      <ul>
        {/* Like */}
        <li>
          <button
            className={classNames(
              "-ms-2 flex h-10 w-10 items-center justify-center p-0 transition-opacity",
              !isLiked && !handleLikeState.loading ? "hover:opacity-60" : ""
            )}
            type="button"
            onClick={() => handleLike(user._id, review._id, setLikers)}
            disabled={handleLikeState.loading}
          >
            <HeartIcon
              className={classNames(
                "h-6 w-6 transition-all",
                isLiked ? "animate-pop fill-red-600 stroke-red-600" : ""
              )}
            />
          </button>
        </li>
      </ul>

      {/* likes panel */}
      {/* {likers.length > 0 && (
        <button
          className="font-semibold"
          type="button"
          onClick={() => setIsLikesModalVisible(true)}
        >
          {likers.length} {likers.length === 1 ? "like" : "likes"}
        </button>
      )}
      <ModalContainer
        title="Likes"
        isOpen={isLikesModalVisible}
        close={() => setIsLikesModalVisible(false)}
        panelClassName="max-w-sm"
      >
        Likes Modal
      </ModalContainer> */}
    </div>
  );
}

export default ReviewInteractions;
