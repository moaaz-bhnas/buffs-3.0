"use client";

import { TmdbDemoMovie } from "@/interfaces/tmdb/TmdbDemoMovie";
import { DateTime } from "luxon";
import Image from "next/image";
import RatingStars from "../rating-stars/RatingStars";
import { Dispatch, SetStateAction } from "react";
import MDEditor from "@uiw/react-md-editor";
import "@uiw/react-md-editor/markdown-editor.css";
import rehypeSanitize from "rehype-sanitize";

type Props = {
  movie: TmdbDemoMovie;
  rating: number;
  setRating: Dispatch<SetStateAction<number>>;
  reviewText: string;
  setReviewText: Dispatch<SetStateAction<string>>;
  setSelectedMovie: Dispatch<SetStateAction<TmdbDemoMovie | null>>;
};

function SelectedMovieView({
  movie,
  rating,
  setRating,
  reviewText,
  setReviewText,
  setSelectedMovie,
}: Props) {
  return (
    <div className="space-y-2">
      <div className="flex items-start gap-x-4">
        {/* Poster */}
        <Image
          className="aspect-[185/278] w-40 animate-load rounded-sm bg-gray-300 sm:w-36"
          src={
            movie.complete_poster_path ||
            "images/placeholders/backdrop-placeholder.svg"
          }
          alt={""}
          width={0}
          height={0}
          sizes="200px"
        />

        {/* Mobie title and genre */}
        <div>
          <p className="text-lg font-light leading-6">
            {movie.title} ({DateTime.fromISO(movie.release_date).year})
          </p>
          {movie.genres && (
            <p className="sm:hidden">
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
    </div>
  );
}

export default SelectedMovieView;
