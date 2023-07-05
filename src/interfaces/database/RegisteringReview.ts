import { DBMovie } from "./DBMovie";

export interface RegisteringReview {
  movieDetails: DBMovie;
  rating: number;
  review: string;
}
