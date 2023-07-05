import { DBMovie } from "@/interfaces/database/DBMovie";
import { TmdbDemoMovie } from "@/interfaces/tmdb/TmdbDemoMovie";

export default function mapTmdbMovieToDBMovie(tmdbMovie: TmdbDemoMovie) {
  const dbMovie: DBMovie = {
    tmdbId: tmdbMovie.id,
    title: tmdbMovie.title,
    posterPath: tmdbMovie.complete_poster_path || "",
    releaseDate: tmdbMovie.release_date,
    genres: tmdbMovie.genres?.map((genre) => genre.name) || [],
    summary: tmdbMovie.overview,
    tmdbRating: tmdbMovie.vote_average,
    director: "Bhnas",
  };

  return dbMovie;
}
