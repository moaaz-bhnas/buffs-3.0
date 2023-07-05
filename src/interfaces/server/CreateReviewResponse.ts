import { Review } from "../database/Review";

export interface CreateReviewResponse {
  success: boolean;
  data: Review;
}
