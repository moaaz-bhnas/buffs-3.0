import { ServerApiClient } from "@/apis/server-api-client";
import React from "react";
import Review from "../browse-reviews/Review";
import getServerToken from "@/helpers/auth/getServerToken";

const serverApiClient = new ServerApiClient();
const token = getServerToken();

interface Props {
  username: string;
  token: string;
}

async function UserReviews({ username, token }: Props) {
  const reviewsResult = await serverApiClient.getReviewsByUsername(
    username,
    token
  );
  if (reviewsResult.isErr()) {
    return <>ll</>;
  }

  return (
    <div>
      <ul>
        {reviewsResult.value.map((review) => (
          <Review key={review._id} review={review} />
        ))}
      </ul>
    </div>
  );
}

export default UserReviews;
