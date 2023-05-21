import { ApiError } from "@/interfaces/api-client/Error";
import { IApiClient } from "@/interfaces/api-client/IApiClient";
import { GenreDetails } from "@/interfaces/movies/GenreDetails";
import { IMovieApiClient } from "@/interfaces/movies/IMovieApiClient";
import { ImageSize } from "@/interfaces/movies/ImageSize";
import { MovieSearchResponse } from "@/interfaces/movies/MovieSearchResponse";
import { MovieSearchResult } from "@/interfaces/movies/MovieSearchResult";
import { MoviesApiConfiguration } from "@/interfaces/movies/MoviesApiConfiguration";
import ApiClient from "@/utils/api-client/apiClient";
import { Result, err, ok } from "neverthrow";

export class MovieApiClient implements IMovieApiClient {
  private apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  private apiBaseUrl = "https://api.themoviedb.org";
  private apiVersion = 3;
  private apiResultsLanguage = "en-US";
  private movieApiClient: IApiClient = new ApiClient({});
  private moviesApiConfiguration: MoviesApiConfiguration | null = null;
  private allGenresDetails: GenreDetails[] | null = null;

  constructor() {
    this.setMoviesApiConfiguration();
    this.setAllGenresDetails();
  }

  private async getMoviesApiConfiguration(): Promise<
    Result<MoviesApiConfiguration, ApiError>
  > {
    if (this.moviesApiConfiguration) return ok(this.moviesApiConfiguration);

    const result = await this.movieApiClient.get<MoviesApiConfiguration>(
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

  private async setMoviesApiConfiguration(): Promise<void> {
    const configuration = await this.getMoviesApiConfiguration();

    if (configuration.isOk()) {
      this.moviesApiConfiguration = configuration.value;
    }
  }

  private async getAllGenresDetails(): Promise<
    Result<GenreDetails[], ApiError>
  > {
    if (this.allGenresDetails) return ok(this.allGenresDetails);

    const result = await this.movieApiClient.get<{ genres: GenreDetails[] }>(
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
    config: { withImages: boolean; imageSize: ImageSize } = {
      withImages: false,
      imageSize: ImageSize.sm,
    }
  ): Promise<Result<MovieSearchResult[], ApiError>> {
    const result = await this.movieApiClient.get<MovieSearchResponse>(
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
        config.imageSize
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
    movies: MovieSearchResult[]
  ): MovieSearchResult[] {
    const moviesWithImages = movies.filter(
      (movie) => movie.backdrop_path && movie.poster_path
    );

    return moviesWithImages;
  }

  private async mapCompleteImagePaths(
    movies: MovieSearchResult[],
    imageSize: ImageSize
  ): Promise<Result<MovieSearchResult[], ApiError>> {
    const configuration = await this.getMoviesApiConfiguration();

    if (configuration.isErr()) {
      return err(configuration.error);
    }

    const { secure_base_url, backdrop_sizes, poster_sizes } =
      configuration.value.images;

    // If passed image size > largest available size from the API, get the largest size
    let backdropSize = imageSize;
    let posterSize = imageSize;
    if (imageSize > backdrop_sizes.length - 1) {
      backdropSize = backdrop_sizes.length - 1;
    }
    if (imageSize > poster_sizes.length - 1) {
      posterSize = poster_sizes.length - 1;
    }

    // Let's go
    const updatedMovies: MovieSearchResult[] = [];

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

  private getGenreDetailsById(
    allGenresDetails: GenreDetails[],
    genreId: number
  ): GenreDetails | null {
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
    movies: MovieSearchResult[]
  ): Promise<Result<MovieSearchResult[], ApiError>> {
    const allGenresDetails = await this.getAllGenresDetails();

    if (allGenresDetails.isErr()) {
      return err(allGenresDetails.error);
    }

    const updatedMovies: MovieSearchResult[] = [];

    // Let's go
    for (const movie of movies) {
      const genres: GenreDetails[] = [];
      for (const genreId of movie.genre_ids) {
        const genreDetails = this.getGenreDetailsById(
          allGenresDetails.value,
          genreId
        );
        if (genreDetails) {
          genres.push(genreDetails);
        }
      }
      movie.genres = genres;
      updatedMovies.push(movie);
    }

    return ok(updatedMovies);
  }
}
