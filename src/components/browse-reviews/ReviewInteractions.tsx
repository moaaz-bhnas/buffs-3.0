"use client";

import { HeartIcon } from "@heroicons/react/24/outline";
import { useAsyncFn } from "react-use";
import { ServerApiClient } from "@/apis/server-api-client";
import { DBReview } from "@/interfaces/database/DBReview";
import { DBUser } from "@/interfaces/database/DBUser";
import classNames from "@/helpers/style/classNames";
import { useState } from "react";

type Props = {
  user: DBUser;
  review: DBReview;
};

const serverApiClient = new ServerApiClient();

function ReviewInteractions({ user, review }: Props) {
  // Like functionality
  const [isLiked, setIsLiked] = useState(review.likers.includes(user._id));
  const [isLikesModalVisible, setIsLikesModalVisible] = useState(false);
  const [handleLikeState, handleLike] = useAsyncFn(async () => {
    const result = await serverApiClient.likeReview(review._id);
    if (result.isErr()) {
      throw new Error(result.error.errorMessage);
    }
  });

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
            onClick={() => {
              setIsLiked((prevState) => !prevState);
              handleLike();
            }}
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
      {review.likers.length > 0 && (
        <button className="font-semibold" type="button">
          {review.likers.length} {review.likers.length === 1 ? "like" : "likes"}
        </button>
      )}
    </div>
  );
}

export default ReviewInteractions;
