"use client";

import { MovieSearchResult } from "@/interfaces/movies/MovieSearchResult";
import { DateTime } from "luxon";
import Image from "next/image";
import RatingStars from "../rating-stars/RatingStars";
import { Dispatch, SetStateAction } from "react";
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";

type Props = {
  movie: MovieSearchResult;
  rating: number;
  setRating: Dispatch<SetStateAction<number>>;
  review: string;
  setReview: Dispatch<SetStateAction<string>>;
};

function SelectedMovieView({
  movie,
  rating,
  setRating,
  review,
  setReview,
}: Props) {
  return (
    <div className="flex items-start gap-x-4">
      {/* Poster */}
      <Image
        className="aspect-[185/278] w-40 animate-load rounded-sm bg-gray-300"
        src={
          movie.complete_poster_path ||
          "images/placeholders/backdrop-placeholder.svg"
        }
        alt={""}
        width={0}
        height={0}
        sizes="200px"
      />

      {/* Review details */}
      <div className="flex flex-1 flex-col gap-y-4">
        <p className="text-lg font-light leading-6">
          {movie.title} ({DateTime.fromISO(movie.release_date).year})
        </p>
        <div className="space-y-1">
          <p className="font-semibold">Your rating:</p>
          <RatingStars starsCount={10} rating={rating} setRating={setRating} />
        </div>
        <div className="container">
          <MDEditor
            value={review}
            onChange={(review) => setReview(review || "")}
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
  );
}

export default SelectedMovieView;
