import { ApiError } from "@/interfaces/api-client/Error";
import { TmdbGenreDetails } from "@/interfaces/tmdb/TmdbGenreDetails";
import { TmdbImageSize } from "@/interfaces/tmdb/TmdbImageSize";
import { TmdbSearchResponse } from "@/interfaces/tmdb/TmdbSearchResponse";
import { TmdbDemoMovie } from "@/interfaces/tmdb/TmdbDemoMovie";
import { TmdbConfiguration } from "@/interfaces/tmdb/TmdbConfiguration";
import ApiClient from "@/helpers/api-client/apiClient";
import { Result, err, ok } from "neverthrow";
import {
  CrewMember,
  TmdbMovieCredits,
} from "@/interfaces/tmdb/TmdbMovieCredits";

export class TmdbApiClient {
  private readonly apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  private readonly apiBaseUrl = "https://api.themoviedb.org";
  private readonly apiVersion = 3;
  private readonly apiResultsLanguage = "en-US";
  private readonly tmdbApiClient = new ApiClient();
  private tmdbConfiguration: TmdbConfiguration | null = null;
  private allGenresDetails: TmdbGenreDetails[] | null = null;

  constructor() {
    this.setTmdbConfiguration();
    this.setAllGenresDetails();
  }

  private async getTmdbConfiguration(): Promise<
    Result<TmdbConfiguration, ApiError>
  > {
    if (this.tmdbConfiguration) return ok(this.tmdbConfiguration);

    const result = await this.tmdbApiClient.get<TmdbConfiguration>(
      `${this.apiBaseUrl}/${this.apiVersion}/configuration?api_key=${this.apiKey}`
    );

    if (result.isErr()) {
      console.error(`Failed to get movies API configuration`, {
        error: result.error,
      });
      return err(result.error);
    }

    return ok(result.value);
  }

  private async setTmdbConfiguration(): Promise<void> {
    const configuration = await this.getTmdbConfiguration();

    if (configuration.isOk()) {
      this.tmdbConfiguration = configuration.value;
    }
  }

  private async getAllGenresDetails(): Promise<
    Result<TmdbGenreDetails[], ApiError>
  > {
    if (this.allGenresDetails) return ok(this.allGenresDetails);

    const result = await this.tmdbApiClient.get<{
      genres: TmdbGenreDetails[];
    }>(
      `${this.apiBaseUrl}/${this.apiVersion}/genre/movie/list?api_key=${this.apiKey}`
    );

    if (result.isErr()) {
      console.error(`Failed to get genres list`, {
        error: result.error,
      });
      return err(result.error);
    }

    return ok(result.value.genres);
  }

  private async setAllGenresDetails(): Promise<void> {
    const result = await this.getAllGenresDetails();

    if (result.isOk()) {
      this.allGenresDetails = result.value;
    }
  }

  async searchMovies(
    query: string,
    config: { withImages: boolean; TmdbImageSize: TmdbImageSize } = {
      withImages: false,
      TmdbImageSize: TmdbImageSize.sm,
    }
  ): Promise<Result<TmdbDemoMovie[], ApiError>> {
    const result = await this.tmdbApiClient.get<TmdbSearchResponse>(
      `${this.apiBaseUrl}/${this.apiVersion}/search/movie?api_key=${this.apiKey}&query=${query}&language=${this.apiResultsLanguage}&page=1`
    );

    if (result.isErr()) {
      console.error(`Failed to search for movies with query: ${query}`, {
        error: result.error,
      });
      return err(result.error);
    }

    let movies = result.value.results;

    if (config.withImages) {
      // Filter out movies without images
      movies = this.filterOutMoviesWithoutImage(movies);

      // Get complete paths for movies images
      const moviesWithCompleteImagesPaths = await this.mapCompleteImagePaths(
        movies,
        config.TmdbImageSize
      );
      if (moviesWithCompleteImagesPaths.isOk()) {
        movies = moviesWithCompleteImagesPaths.value;
      }
    }

    // map genres details
    const moviesWithGenresDetails = await this.mapGenresDetailsToMovies(movies);
    if (moviesWithGenresDetails.isOk()) {
      movies = moviesWithGenresDetails.value;
    }

    return ok(movies);
  }

  private filterOutMoviesWithoutImage(
    movies: TmdbDemoMovie[]
  ): TmdbDemoMovie[] {
    const moviesWithImages = movies.filter(
      (movie) => movie.backdrop_path && movie.poster_path
    );

    return moviesWithImages;
  }

  private async mapCompleteImagePaths(
    movies: TmdbDemoMovie[],
    TmdbImageSize: TmdbImageSize
  ): Promise<Result<TmdbDemoMovie[], ApiError>> {
    const configuration = await this.getTmdbConfiguration();

    if (configuration.isErr()) {
      return err(configuration.error);
    }

    const { secure_base_url, backdrop_sizes, poster_sizes } =
      configuration.value.images;

    // If passed image size > largest available size from the API, get the largest size
    let backdropSize = TmdbImageSize;
    let posterSize = TmdbImageSize;
    if (TmdbImageSize > backdrop_sizes.length - 1) {
      backdropSize = backdrop_sizes.length - 1;
    }
    if (TmdbImageSize > poster_sizes.length - 1) {
      posterSize = poster_sizes.length - 1;
    }

    // Let's go
    const updatedMovies: TmdbDemoMovie[] = [];

    for (const movie of movies) {
      if (movie.backdrop_path) {
        movie.complete_backdrop_path = `${secure_base_url}${backdrop_sizes[backdropSize]}${movie.backdrop_path}`;
      }
      if (movie.poster_path) {
        movie.complete_poster_path = `${secure_base_url}${poster_sizes[posterSize]}${movie.poster_path}`;
      }
      updatedMovies.push(movie);
    }

    return ok(updatedMovies);
  }

  private getTmdbGenreDetailsById(
    allGenresDetails: TmdbGenreDetails[],
    genreId: number
  ): TmdbGenreDetails | null {
    const result = allGenresDetails.find(({ id }) => id === genreId);

    if (result) {
      return result;
    } else {
      console.error(
        `couldn't find genre id in list of genres fetched from TMDB`,
        { genreId, allGenresDetails }
      );
      return null;
    }
  }

  private async mapGenresDetailsToMovies(
    movies: TmdbDemoMovie[]
  ): Promise<Result<TmdbDemoMovie[], ApiError>> {
    const allGenresDetails = await this.getAllGenresDetails();

    if (allGenresDetails.isErr()) {
      return err(allGenresDetails.error);
    }

    const updatedMovies: TmdbDemoMovie[] = [];

    // Let's go
    for (const movie of movies) {
      const genres: TmdbGenreDetails[] = [];
      for (const genreId of movie.genre_ids) {
        const TmdbGenreDetails = this.getTmdbGenreDetailsById(
          allGenresDetails.value,
          genreId
        );
        if (TmdbGenreDetails) {
          genres.push(TmdbGenreDetails);
        }
      }
      movie.genres = genres;
      updatedMovies.push(movie);
    }

    return ok(updatedMovies);
  }

  private async getMovieCredits(
    movieId: number
  ): Promise<Result<TmdbMovieCredits, ApiError>> {
    const result = await this.tmdbApiClient.get<TmdbMovieCredits>(
      `${this.apiBaseUrl}/${this.apiVersion}/movie/${movieId}/credits?api_key=${this.apiKey}&language=${this.apiResultsLanguage}`
    );

    if (result.isErr()) {
      console.error(`Failed to get credits for movie id: ${movieId}`, {
        error: result.error,
      });
      return err(result.error);
    }

    return ok(result.value);
  }

  async getMovieDirector(
    movieId: number
  ): Promise<Result<CrewMember, ApiError>> {
    const movieCreditsResult = await this.getMovieCredits(movieId);

    if (movieCreditsResult.isErr()) {
      console.error(`Failed to get credits for movie id: ${movieId}`, {
        error: movieCreditsResult.error,
      });
      return err(movieCreditsResult.error);
    }

    const director = movieCreditsResult.value.crew.find(
      (crewMember) => crewMember.job === "Director"
    );

    if (!director) {
      console.error(`Couldn't find director for movie id: ${movieId}`, {
        movieCrew: movieCreditsResult.value.crew,
      });
      return err({
        errorMessage: `Couldn't find director for movie id: ${movieId}`,
      });
    }

    return ok(director);
  }
}
