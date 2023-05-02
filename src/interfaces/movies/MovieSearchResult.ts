export interface MovieSearchResult {
  id: string;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  // other data we don't care about
}
