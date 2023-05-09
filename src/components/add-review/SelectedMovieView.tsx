"use client";

import { MovieSearchResult } from "@/interfaces/movies/MovieSearchResult";
import { DateTime } from "luxon";
import Image from "next/image";
import RatingStars from "../rating-stars/RatingStars";
import { Dispatch, SetStateAction } from "react";

type Props = {
  movie: MovieSearchResult;
  rating: number;
  setRating: Dispatch<SetStateAction<number>>;
};

function SelectedMovieView({ movie, rating, setRating }: Props) {
  return (
    <div className="flex gap-x-4">
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
      <div className="space-y-4">
        <p className="text-lg font-light leading-6">
          {movie.title} ({DateTime.fromISO(movie.release_date).year})
        </p>
        <div>
          <p className="space-y-2 font-semibold">Your rating:</p>
          <RatingStars starsCount={10} rating={rating} setRating={setRating} />
        </div>
        <textarea />
      </div>
    </div>
  );
}

export default SelectedMovieView;
