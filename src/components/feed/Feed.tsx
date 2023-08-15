"use client";

import { ServerApiClient } from "@/apis/server-api-client";
import Review from "../browse-reviews/Review";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import socket from "@/socket";
import { useAsyncFn } from "react-use";
import { DBReview } from "@/interfaces/database/DBReview";
import { SocketEvent } from "@/interfaces/socket/SocketEvent";
import structuredClone from "@ungap/structured-clone";

type Props = {};

const serverApiClient = new ServerApiClient();

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

function Feed({}: Props) {
  const [reviews, setReveiws] = useState<DBReview[]>([]);

  const [getReveiwsState, getAndSetReviews] = useAsyncFn(async () => {
    const reviewsResult = await serverApiClient.getReviews();

    if (reviewsResult.isErr()) {
      throw new Error(JSON.stringify(reviewsResult.error));
    }

    setReveiws(reviewsResult.value);
  });

  // effects
  useEffect(() => {
    getAndSetReviews();
  }, []);

  useEffect(function establishSocketConnection() {
    socket.on("connect", () => {
      // Join feed room
      socket.emit(SocketEvent.SUBSCRIBED_TO_FEED);
    });

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

  return (
    <section>
      <ul>
        {reviews.map((review) => (
          <Review key={review._id} review={review} />
        ))}
      </ul>
    </section>
  );
}

export default Feed;
