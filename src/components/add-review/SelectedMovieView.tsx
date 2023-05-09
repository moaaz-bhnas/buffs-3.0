import { MovieSearchResult } from "@/interfaces/movies/MovieSearchResult";
import { DateTime } from "luxon";
import Image from "next/image";
import RatingStars from "../rating-stars/RatingStars";

type Props = {
  movie: MovieSearchResult;
};

function SelectedMovieView({ movie }: Props) {
  return (
    <div className="flex gap-x-4">
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
      <div className="space-y-4">
        <p className="text-lg font-light leading-6">
          {movie.title} ({DateTime.fromISO(movie.release_date).year})
        </p>
        <RatingStars starsCount={10} />
      </div>
    </div>
  );
}

export default SelectedMovieView;
