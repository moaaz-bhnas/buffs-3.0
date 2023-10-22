"use client";

import Image from "next/image";
import { DBReview } from "@/interfaces/database/DBReview";
import { FormEvent, useState } from "react";
import { DateTime } from "luxon";
import RatingStars from "../rating-stars/RatingStars";
import ThemeButton from "../theme-button/ThemeButton";
import { useAsyncFn } from "react-use";
import { ServerApiClient } from "@/apis/server-api-client";
import errorMessages from "@/utils/messages/errorMessages";
import getFirstWord from "@/helpers/string/getFirstWord";

type Props = {
  review: DBReview;
  onSuccess?: Function;
  userDisplayName: string;
};

type TOnSubmit = (event: FormEvent<HTMLFormElement>) => Promise<void>;

const serverApiClient = new ServerApiClient();

function EditReviewForm({
  review,
  userDisplayName,
  onSuccess = () => {},
}: Props) {
  const [rating, setRating] = useState(review.rating);
  const [reviewText, setReviewText] = useState(review.review);

  // submit
  const [handleSubmitState, handleSubmit] = useAsyncFn<TOnSubmit>(
    async (event) => {
      // 1. prevent default behaviour on submit
      event.preventDefault();

      // 2. Update
      const result = await serverApiClient.updateReview(review._id, {
        rating,
        review: reviewText,
      });

      if (result.isErr()) {
        console.error(result.error.errorMessage);
        throw new Error(result.error.errorMessage);
      }

      onSuccess();
    },
    [rating, reviewText]
  );

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="flex items-start gap-x-4">
        {/* Poster */}
        <Image
          className="aspect-[185/278] w-28 animate-load rounded-sm bg-gray-300 sm:w-40"
          src={review.movieDetails.posterPath}
          alt={""}
          width={0}
          height={0}
          sizes="200px"
        />

        {/* Movie title and genre */}
        <div>
          <p className="font-light leading-6 sm:text-lg">
            {review.movieDetails.title} (
            {DateTime.fromISO(review.movieDetails.releaseDate).year})
          </p>
          <p className="text-sm text-gray-600">
            {review.movieDetails.genres.join(", ")}
          </p>
        </div>
      </div>

      {/* Review details */}
      <div className="space-y-3">
        <RatingStars starsCount={10} rating={rating} setRating={setRating} />

        <textarea
          className="h-28 w-full rounded-md border p-2"
          placeholder={`How do you feel about this movie, ${getFirstWord(
            userDisplayName
          )}?`}
          value={reviewText}
          onChange={(event) => setReviewText(event.target.value)}
        />
      </div>

      <ThemeButton
        type="submit"
        className="w-full"
        loading={handleSubmitState.loading}
        errorMessage={
          handleSubmitState.error && errorMessages.somthingWentWrong
        }
        disabled={rating === review.rating && reviewText === review.review}
      >
        Save
      </ThemeButton>
    </form>
  );
}

export default EditReviewForm;
