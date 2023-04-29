export interface MovieSearchResponse {
  page: number;
  results: MovieSearchResponse[];
  total_results: number;
  total_pages: number;
}
