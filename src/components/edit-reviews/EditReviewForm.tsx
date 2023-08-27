"use client";

import Image from "next/image";
import { DBReview } from "@/interfaces/database/DBReview";
import { useState } from "react";
import { DateTime } from "luxon";
import RatingStars from "../rating-stars/RatingStars";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import ThemeButton from "../theme-button/ThemeButton";

type Props = {
  review: DBReview;
};

function EditReviewForm({ review }: Props) {
  const [rating, setRating] = useState(review.rating);
  const [reviewText, setReviewText] = useState(review.review);

  return (
    <form className="space-y-4">
      <div className="flex items-start gap-x-4">
        {/* Poster */}
        <Image
          className="aspect-[185/278] w-40 animate-load rounded-sm bg-gray-300 sm:w-24"
          src={review.movieDetails.posterPath}
          alt={""}
          width={0}
          height={0}
          sizes="200px"
        />

        {/* Movie title and genre */}
        <div>
          <p className="text-lg font-light leading-6">
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

        <MDEditor
          value={reviewText}
          onChange={(review) => setReviewText(review || "")}
          preview="edit"
          previewOptions={{
            rehypePlugins: [[rehypeSanitize]],
          }}
          commandsFilter={(cmd) =>
            cmd.name &&
            /(code|comment|image|strikethrough|title|link|divider)/.test(
              cmd.name
            )
              ? false
              : cmd
          }
          height={175}
        />
      </div>

      <ThemeButton
        type="submit"
        className="w-full"
        // loading={handleSubmitState.loading}
        // errorMessage={
        //   handleSubmitState.error && errorMessages.somthingWentWrong
        // }
        // successMessage={isSuccess ? successMessages.review : undefined}
        disabled={rating === 0}
      >
        Save
      </ThemeButton>
    </form>
  );
}

export default EditReviewForm;
