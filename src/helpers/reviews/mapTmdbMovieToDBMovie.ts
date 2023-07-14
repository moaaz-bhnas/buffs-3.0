import { DBMovie } from "@/interfaces/database/DBMovie";
import { TmdbDemoMovie } from "@/interfaces/tmdb/TmdbDemoMovie";

export default function mapTmdbMovieToDBMovie(
  tmdbMovie: TmdbDemoMovie
): DBMovie {
  const dbMovie: DBMovie = {
    tmdbId: tmdbMovie.id,
    title: tmdbMovie.title,
    posterPath: tmdbMovie.complete_poster_path || "",
    releaseDate: tmdbMovie.release_date,
    genres: tmdbMovie.genres?.map((genre) => genre.name) || [],
    summary: tmdbMovie.overview,
    tmdbRating: tmdbMovie.vote_average,
  };

  if (tmdbMovie.director) {
    dbMovie.director = {
      tmdbId: tmdbMovie.director.id,
      name: tmdbMovie.director.name,
      tmdbCreditId: tmdbMovie.director.credit_id,
    };
  }

  return dbMovie;
}
