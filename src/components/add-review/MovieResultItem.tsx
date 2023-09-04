import { TmdbDemoMovie } from "@/interfaces/tmdb/TmdbDemoMovie";
import { DateTime } from "luxon";
import Image from "next/image";

type Props = {
  movie: TmdbDemoMovie;
  onClick: (movie: TmdbDemoMovie) => void;
};

function MovieResultItem({ movie, onClick }: Props) {
  return (
    <div className="space-y-1">
      <button
        className="flex w-full transition-all hover:ring-4 hover:ring-teal-400"
        type="button"
        onClick={() => onClick(movie)}
      >
        <Image
          className="aspect-[185/278] w-full animate-load rounded-sm bg-gray-300"
          src={
            movie.complete_poster_path ||
            "images/placeholders/backdrop-placeholder.svg"
          }
          alt={`Select ${movie.title}`}
          width={0}
          height={0}
          sizes="200px"
        />
      </button>

      <p className="text-xs sm:text-sm">
        {movie.title} ({DateTime.fromISO(movie.release_date).year})
      </p>
    </div>
  );
}

export default MovieResultItem;
