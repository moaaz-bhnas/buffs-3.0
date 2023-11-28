"use client";

import Review from "../browse-reviews/Review";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import socket from "@/socket";
import { DBReview } from "@/interfaces/database/DBReview";
import { SocketEvent } from "@/interfaces/socket/SocketEvent";
import structuredClone from "@ungap/structured-clone";
import { DBUser } from "@/interfaces/database/DBUser";

function handleReviewUpdate(
  updatedReview: DBReview,
  setReveiws: Dispatch<SetStateAction<DBReview[]>>
) {
  setReveiws((prevReviews) => {
    let newReviews = structuredClone(prevReviews);
    newReviews = newReviews.map((review) => {
      if (review._id === updatedReview._id) {
        return updatedReview;
      } else {
        return review;
      }
    });
    return newReviews;
  });
}

function handleNewReviews(
  newReview: DBReview,
  setReveiws: Dispatch<SetStateAction<DBReview[]>>
) {
  setReveiws((prevReviews) => {
    const prevReviewsClone = structuredClone(prevReviews);
    const newReviews = [newReview].concat(prevReviewsClone);
    return newReviews;
  });
}

type Props = {
  user: DBUser;
  reviews: DBReview[];
};

function Feed({ user, reviews: serverReviews }: Props) {
  const [reviews, setReveiws] = useState<DBReview[]>(serverReviews);

  useEffect(function establishSocketConnection() {
    // socket.on("connect", () => {
    //   console.log("🍩 Joining feed room");
    // Join feed room
    socket.emit(SocketEvent.SUBSCRIBED_TO_FEED);
    // });

    // Listen to reviews update
    socket.on(SocketEvent.REVIEW_UPDATED, (updatedReview: DBReview) => {
      handleReviewUpdate(updatedReview, setReveiws);
    });

    // Listen to new reviews
    socket.on(SocketEvent.REVIEW_CREATED, (newReview: DBReview) => {
      handleNewReviews(newReview, setReveiws);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pong");
    };
  }, []);

  /**
   * Filter out soft-deleted reviews
   * Normally, reviews are passed without soft-deleted
   * but this is just for real-time functionality
   */
  const filteredReviews = reviews.filter((review) => !review.isDeleted);

  return (
    <section aria-label="Feed">
      {/* divide-y */}
      <ul className="space-y-8">
        {filteredReviews.map((review) => (
          <Review key={review._id} review={review} user={user} />
        ))}
      </ul>
    </section>
  );
}

export default Feed;
