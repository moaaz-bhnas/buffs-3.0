import { DBReview } from "../database/DBReview";

export interface GetReviewsResponse {
  success: boolean;
  count: number;
  pagination: {
    [key: string]: {
      page: number;
      limit: number;
    };
  };
  data: DBReview[];
}
