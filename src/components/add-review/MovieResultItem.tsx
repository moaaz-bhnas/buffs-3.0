import { MovieSearchResult } from "@/interfaces/movies/MovieSearchResult";
import Image from "next/image";

type Props = {
  movie: MovieSearchResult;
};

function MovieResultItem({ movie }: Props) {
  return (
    <button>
      <Image
        src={movie.backdrop_path || "https://placehold.co/300x169"}
        alt={`Select ${movie.title}`}
        width={0}
        height={0}
        className="w-10"
      />
    </button>
  );
}

export default MovieResultItem;
