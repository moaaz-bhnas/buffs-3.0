import { IApiClient } from "@/interfaces/api-client/IApiClient";
import { IMovieApiClient } from "@/interfaces/movies/IMovieApiClient";
import { MovieSearchResponse } from "@/interfaces/movies/MovieSearchResponse";
import { MovieSearchResult } from "@/interfaces/movies/MovieSearchResult";
import ApiClient from "@/utils/api-client/api-client";

export class MovieApiClient implements IMovieApiClient {
  private apiKey = process.env.TMDB_API_KEY;
  private apiBaseUrl = "https://api.themoviedb.org";
  private apiVersion = 3;
  private apiResultsLanguage = "en-US";
  private movieApiClient: IApiClient = new ApiClient({});

  async searchMovies(query: string): Promise<MovieSearchResult[] | null> {
    const result = await this.movieApiClient.get<MovieSearchResponse>(
      `${this.apiBaseUrl}/${this.apiVersion}/search/movie?api_key=${this.apiKey}&query=${query}&language=${this.apiResultsLanguage}&page=1`
    );

    if (result.isErr()) {
      console.error(`Failed to search for movies with query: ${query}`, {
        error: result.error,
      });
      return null;
    }

    return result.value.results;
  }
}
