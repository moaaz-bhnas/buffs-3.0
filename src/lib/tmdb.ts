import { MovieSearchResult } from "@/interfaces/movies/MovieSearchResult";
import axios from "axios";

class MoviesSDK {
  static apiKey = process.env.TMDB_API_KEY;
  static apiBaseUrl = "https://api.themoviedb.org";
  static apiVersion = 3;
  static apiResultsLanguage = "en-US";

  // static async searchMovies(query: string): MovieSearchResult[] {
  //   const results = axios.get(
  //     `${this.apiBaseUrl}/${this.apiVersion}/search/movie?api_key=${this.apiKey}&query=${query}&language=${this.apiResultsLanguage}&page=1`
  //   );
  // }
}

export default MoviesSDK;
