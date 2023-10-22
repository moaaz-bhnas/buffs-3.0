"use client";

import { TmdbDemoMovie } from "@/interfaces/tmdb/TmdbDemoMovie";
import { DateTime } from "luxon";
import Image from "next/image";
import RatingStars from "../rating-stars/RatingStars";
import { Dispatch, SetStateAction } from "react";
import getFirstWord from "@/helpers/string/getFirstWord";

type Props = {
  movie: TmdbDemoMovie;
  rating: number;
  setRating: Dispatch<SetStateAction<number>>;
  reviewText: string;
  setReviewText: Dispatch<SetStateAction<string>>;
  userDisplayName: string;
};

function SelectedMovieView({
  movie,
  rating,
  setRating,
  reviewText,
  setReviewText,
  userDisplayName,
}: Props) {
  return (
    <div className="space-y-2">
      <div className="flex items-start gap-x-4">
        {/* Poster */}
        <Image
          className="aspect-[185/278] w-28 animate-load rounded-sm bg-gray-300"
          src={
            movie.complete_poster_path ||
            "images/placeholders/backdrop-placeholder.svg"
          }
          alt={""}
          width={0}
          height={0}
          sizes="200px"
        />

        {/* Movie title and genre */}
        <div>
          <p className="text-lg font-light leading-6">
            {movie.title} ({DateTime.fromISO(movie.release_date).year})
          </p>
          {movie.genres && (
            <p className="text-sm text-gray-600">
              {movie.genres.map((genre) => genre.name).join(", ")}
            </p>
          )}
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
            <textarea
              className="h-28 w-full rounded-md border p-2"
              placeholder={`How do you feel about this movie, ${getFirstWord(
                userDisplayName
              )}?`}
              value={reviewText}
              onChange={(event) => setReviewText(event.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectedMovieView;
