import { ServerApiClient } from "@/apis/server-api-client";
import getServerToken from "@/helpers/auth/getServerToken";
import Review from "../browse-reviews/Review";
import getServerUser from "@/helpers/auth/getServerUser";

type Props = {};

const serverApiClient = new ServerApiClient();

async function Feed({}: Props) {
  const currentViewer = await getServerUser();
  if (currentViewer.isErr()) {
    return <></>;
  }
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
          <Review
            key={review._id}
            review={review}
            currentViewer={currentViewer.value.username}
          />
        ))}
      </ul>
    </section>
  );
}

export default Feed;
