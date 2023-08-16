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

<<<<<<< HEAD
function handleNewReviews(
  newReview: DBReview,
  setReveiws: Dispatch<SetStateAction<DBReview[]>>
) {
  setReveiws((prevReviews) => {
    const prevReviewsClone = structuredClone(prevReviews);
    const newReviews = [newReview].concat(prevReviewsClone);
    return newReviews;
  });
}

function Feed({}: Props) {
  const [reviews, setReveiws] = useState<DBReview[]>([]);

  const [getReveiwsState, getAndSetReviews] = useAsyncFn(async () => {
    const reviewsResult = await serverApiClient.getReviews();

    if (reviewsResult.isErr()) {
      throw new Error(JSON.stringify(reviewsResult.error));
    }

    setReveiws(reviewsResult.value);
  });

  // effects
  useEffect(() => {
    getAndSetReviews();
  }, []);

  useEffect(function establishSocketConnection() {
    socket.on("connect", () => {
      // Join feed room
      socket.emit(SocketEvent.SUBSCRIBED_TO_FEED);
    });

    // Listen to reviews update
    socket.on(SocketEvent.REVIEW_UPDATED, (updatedReview: DBReview) => {
      handleReviewUpdate(updatedReview, setReveiws);
    });

    // Listen to new reviews
    socket.on(SocketEvent.REVIEW_CREATED, (newReview: DBReview) => {
      handleNewReviews(newReview, setReveiws);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pong");
    };
  }, []);
=======
  if (reviewsResult.isErr()) {
    console.error(reviewsResult.error.errorMessage);
    return <></>;
  }
>>>>>>> 015c0cb124abcd81c5bfc97bcb01be64c97c9fdb

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
