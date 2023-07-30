import { ServerApiClient } from "@/apis/server-api-client";
import getServerToken from "@/helpers/auth/getServerToken";
import Review from "../browse-reviews/Review";

type Props = {};

const serverApiClient = new ServerApiClient();

async function Feed({}: Props) {
  const token = getServerToken();
  const reviewsResult = await serverApiClient.getReviews(token);

  if (reviewsResult.isErr()) {
    console.error(reviewsResult.error.errorMessage);
    return <></>;
  }

  return (
    <section>
      <ul>
        {reviewsResult.value.map((review) => (
          <Review key={review._id} review={review} />
        ))}
      </ul>
    </section>
  );
}

export default Feed;
