import { DBReview } from "../database/DBReview";

export interface DeleteReviewResponse {
  success: boolean;
  data: DBReview;
}
