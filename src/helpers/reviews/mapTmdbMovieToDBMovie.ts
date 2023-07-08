import { TmdbApiClient } from "@/apis/tmdb-api-client";
import { ApiError } from "@/interfaces/api-client/Error";
import { DBMovie } from "@/interfaces/database/DBMovie";
import { TmdbDemoMovie } from "@/interfaces/tmdb/TmdbDemoMovie";
import { Result, err, ok } from "neverthrow";

export default async function mapTmdbMovieToDBMovie(
  tmdbMovie: TmdbDemoMovie
): Promise<Result<DBMovie, ApiError>> {
  // Get director data
  const tmdbApiClient = new TmdbApiClient();
  const directorResult = await tmdbApiClient.getMovieDirector(tmdbMovie.id);

  if (directorResult.isErr()) {
    return err(directorResult.error);
  }

  // Create movie object
  const dbMovie: DBMovie = {
    tmdbId: tmdbMovie.id,
    title: tmdbMovie.title,
    posterPath: tmdbMovie.complete_poster_path || "",
    releaseDate: tmdbMovie.release_date,
    genres: tmdbMovie.genres?.map((genre) => genre.name) || [],
    summary: tmdbMovie.overview,
    tmdbRating: tmdbMovie.vote_average,
    director: {
      tmdbId: directorResult.value.id,
      name: directorResult.value.name,
      tmdbCreditId: directorResult.value.credit_id,
    },
  };

  return ok(dbMovie);
}
