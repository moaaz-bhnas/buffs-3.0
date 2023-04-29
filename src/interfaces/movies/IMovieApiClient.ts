import { MovieSearchResult } from "./MovieSearchResult";

export interface IMovieApiClient {
  searchMovies(query: string): Promise<MovieSearchResult[] | null>;
}
