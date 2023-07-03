import { Result } from "neverthrow";
import { ImageSize } from "./ImageSize";
import { MovieSearchResult } from "./MovieSearchResult";
import { ApiError } from "../api-client/Error";

export interface IMovieApiClient {
  searchMovies(
    query: string,
    config?: { withImages: boolean; imageSize: ImageSize }
  ): Promise<Result<MovieSearchResult[], ApiError>>;
}
