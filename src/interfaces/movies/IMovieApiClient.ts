import { Result } from "neverthrow";
import { ImageSize } from "./ImageSize";
import { ImageType } from "./ImageType";
import { MovieSearchResult } from "./MovieSearchResult";
import { APIError } from "../api-client/Error";

export interface IMovieApiClient {
  searchMovies(
    query: string,
    imagesConfig?: { imageType: ImageType; imageSize: ImageSize }
  ): Promise<Result<MovieSearchResult[], APIError>>;
}
