import { DBReview } from "../database/DBReview";

export interface CreateReviewResponse {
  success: boolean;
  data: DBReview;
}
