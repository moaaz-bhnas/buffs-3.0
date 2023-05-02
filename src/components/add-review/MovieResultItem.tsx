import { MovieSearchResult } from "@/interfaces/movies/MovieSearchResult";
import { DateTime } from "luxon";
import Image from "next/image";

type Props = {
  movie: MovieSearchResult;
};

function MovieResultItem({ movie }: Props) {
  return (
    <div>
      <button type="button" className="flex w-full">
        <Image
          className="aspect-[300/169] w-full animate-load rounded-sm bg-gray-300"
          src={
            movie.backdrop_path ||
            "images/placeholders/backdrop-placeholder.svg"
          }
          alt={`Select ${movie.title}`}
          width={0}
          height={0}
          sizes="300px"
        />
      </button>

      <p className="text-sm font-semibold">
        {movie.title} ({DateTime.fromISO(movie.release_date).year})
      </p>
    </div>
  );
}

export default MovieResultItem;
