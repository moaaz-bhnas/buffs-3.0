import { ImageSize } from "./ImageSize";
import { ImageType } from "./ImageType";
import { MovieSearchResult } from "./MovieSearchResult";

export interface IMovieApiClient {
  searchMovies(
    query: string,
    imagesConfig?: { imageType: ImageType; imageSize: ImageSize }
  ): Promise<MovieSearchResult[] | null>;
}
