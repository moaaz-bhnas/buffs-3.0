import { DBReview } from "@/interfaces/database/DBReview";
import Avatar from "../avatar/Avatar";
import Link from "next/link";
import Image from "next/image";
import { DateTime } from "luxon";
import { StarIcon } from "@heroicons/react/24/outline";
import { DBUser } from "@/interfaces/database/DBUser";
import PopoverReviewActions from "./ReviewActionsPopover";
import ReviewInteractions from "./ReviewInteractions";

type Props = {
  review: DBReview;
  user: DBUser;
};

function Review({ review, user }: Props) {
  const isAuthor = user._id === review.userId;

  return (
    // py-3 first:pt-0
    <li role="article" className="space-y-2">
      {/* username and avatar */}
      <header className="flex items-center gap-x-4">
        <div className="flex items-center gap-x-1">
          <Link className="shrink-0" href={`/${review.userDetails.username}`}>
            <Avatar size={40} avatarUrl={review.userDetails.avatar} />
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-x-4">
            <Link
              href={`/${review.userDetails.username}`}
              className="font-semibold"
            >
              {review.userDetails.displayName}
            </Link>
            <time
              className="text-sm text-gray-600"
              dateTime={review.createdAt}
              suppressHydrationWarning={true}
            >
              {DateTime.fromISO(review.createdAt).toRelative()}
            </time>
          </div>
        </div>
        <div className="ms-auto">
          <PopoverReviewActions
            isAuthor={isAuthor}
            userDisplayName={user.displayName}
            review={review}
          />
        </div>
      </header>

      {/* movie details */}
      <div className="flex items-start gap-x-2">
        <Image
          className="w-20 shrink-0 rounded-sm sm:w-28"
          src={review.movieDetails.posterPath}
          alt={""}
          width={0}
          height={0}
          sizes="8rem"
        />

        <div className="flex-1 space-y-1">
          <p className="text-base leading-6">
            {review.movieDetails.title} (
            {DateTime.fromISO(review.movieDetails.releaseDate).year})
          </p>
          <p className="text-sm text-gray-600">
            {review.movieDetails.genres.join(", ")}
          </p>

          <hr />

          <p className="flex items-center gap-x-1">
            <StarIcon className="w-4 fill-yellow-600 stroke-none" />
            <span className="text-base font-semibold">{review.rating}</span>
          </p>
          <p className="font-serif">{review.review}</p>
        </div>
      </div>

      {/* Review like / comment / share */}
      <ReviewInteractions user={user} review={review} />
    </li>
  );
}

export default Review;
