"use client";

import Image from "next/image";
import { DBReview } from "@/interfaces/database/DBReview";
import { useState } from "react";
import { DateTime } from "luxon";
import RatingStars from "../rating-stars/RatingStars";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";

type Props = {
  review: DBReview;
};

function EditReviewForm({ review }: Props) {
  const [rating, setRating] = useState(review.rating);
  const [reviewText, setReviewText] = useState(review.review);

  return (
    <form className="space-y-2">
      <div className="flex items-start gap-x-4">
        {/* Poster */}
        <Image
          className="aspect-[185/278] w-40 animate-load rounded-sm bg-gray-300 sm:w-36"
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
          <p className="sm:hidden">{review.movieDetails.genres.join(", ")}</p>
        </div>
      </div>

      <div>
        {/* Review details */}
        <div className="flex flex-1 flex-col gap-y-4">
          <div className="space-y-1">
            <p className="font-semibold">Your rating:</p>
            <RatingStars
              starsCount={10}
              rating={rating}
              setRating={setRating}
            />
          </div>
          <div className="container">
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
            />
          </div>
        </div>
      </div>
    </form>
  );
}

export default EditReviewForm;
