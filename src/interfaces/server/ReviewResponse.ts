import { DBReview } from "../database/DBReview";

export interface ReviewResponse {
  success: boolean;
  data: DBReview;
}
