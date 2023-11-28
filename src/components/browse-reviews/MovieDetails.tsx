import Image from "next/image";
import { DBReview } from "@/interfaces/database/DBReview";
import { DateTime } from "luxon";
import { StarIcon } from "@heroicons/react/24/outline";

type Props = {
  review: DBReview;
};

function MovieDetails({ review }: Props) {
  return (
    <div>
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
    </div>
  );
}

export default MovieDetails;
