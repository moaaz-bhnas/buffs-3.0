import { DBReview } from "../database/DBReview";

export interface UpdateReviewResponse {
  success: boolean;
  data: DBReview;
}
