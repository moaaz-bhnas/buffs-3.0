import { IApiClient } from "@/interfaces/api-client/IApiClient";
import { IMovieApiClient } from "@/interfaces/movies/IMovieApiClient";
import { ImageSize } from "@/interfaces/movies/ImageSize";
import { ImageType } from "@/interfaces/movies/ImageType";
import { MovieSearchResponse } from "@/interfaces/movies/MovieSearchResponse";
import { MovieSearchResult } from "@/interfaces/movies/MovieSearchResult";
import { MoviesApiConfiguration } from "@/interfaces/movies/MoviesApiConfiguration";
import ApiClient from "@/utils/api-client/api-client";

export class MovieApiClient implements IMovieApiClient {
  private apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  private apiBaseUrl = "https://api.themoviedb.org";
  private apiVersion = 3;
  private apiResultsLanguage = "en-US";
  private movieApiClient: IApiClient = new ApiClient({});
  private moviesApiConfiguration: MoviesApiConfiguration | null = null;

  private async getMoviesApiConfiguration(): Promise<MoviesApiConfiguration | null> {
    const result = await this.movieApiClient.get<MoviesApiConfiguration>(
      `${this.apiBaseUrl}/${this.apiVersion}/configuration?api_key=${this.apiKey}`
    );

    if (result.isErr()) {
      console.error(`Failed to get movies API configuration`, {
        error: result.error,
      });
      return null;
    }

    return result.value;
  }

  private async setMoviesApiConfiguration(): Promise<void> {
    if (!this.moviesApiConfiguration) {
      const configuration = await this.getMoviesApiConfiguration();
      if (configuration) {
        this.moviesApiConfiguration = configuration;
      }
    }
  }

  async searchMovies(
    query: string,
    imagesConfig?: { imageType: ImageType; imageSize: ImageSize }
  ): Promise<MovieSearchResult[] | null> {
    const result = await this.movieApiClient.get<MovieSearchResponse>(
      `${this.apiBaseUrl}/${this.apiVersion}/search/movie?api_key=${this.apiKey}&query=${query}&language=${this.apiResultsLanguage}&page=1`
    );

    if (result.isErr()) {
      console.error(`Failed to search for movies with query: ${query}`, {
        error: result.error,
      });
      return null;
    }

    let movies = result.value.results;

    if (imagesConfig) {
      // Filter out movies without images
      movies = this.filterOutMoviesWithoutImage(movies);

      // Get complete paths for movies images
      switch (imagesConfig.imageType) {
        case ImageType.backdrop: {
          movies = await this.mapCompleteBackdropPathsToMovies(
            movies,
            imagesConfig.imageSize
          );
          break;
        }
      }
    }

    return movies;
  }

  private filterOutMoviesWithoutImage(
    movies: MovieSearchResult[]
  ): MovieSearchResult[] {
    const moviesWithImages = movies.filter(
      (movie) => movie.backdrop_path && movie.poster_path
    );

    return moviesWithImages;
  }

  private async getCompleteBackdropPath(
    filePath: string,
    imageSize: ImageSize
  ): Promise<string | null> {
    await this.setMoviesApiConfiguration();

    if (!this.moviesApiConfiguration) {
      return null;
    }

    const { secure_base_url, backdrop_sizes } =
      this.moviesApiConfiguration.images;

    // If passed image size > largest available size from the API, get the largest size
    if (imageSize > backdrop_sizes.length - 1) {
      imageSize = backdrop_sizes.length - 1;
    }

    const backdropPath = `${secure_base_url}${backdrop_sizes[imageSize]}${filePath}`;
    return backdropPath;
  }

  private async mapCompleteBackdropPathsToMovies(
    movies: MovieSearchResult[],
    imageSize: ImageSize
  ): Promise<MovieSearchResult[]> {
    const results = await Promise.all(
      movies.map(async (movie) => {
        if (!movie.backdrop_path) {
          return movie;
        }
        const completeBackdropPath = await this.getCompleteBackdropPath(
          movie.backdrop_path,
          imageSize
        );
        movie.backdrop_path = completeBackdropPath;
        return movie;
      })
    );

    return results;
  }
}
