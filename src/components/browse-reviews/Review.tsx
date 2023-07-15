"use client";

import { DBReview } from "@/interfaces/database/DBReview";
import Avatar from "../avatar/Avatar";
import Link from "next/link";
import Image from "next/image";
import { DateTime } from "luxon";
import { StarIcon } from "@heroicons/react/24/outline";
import MDEditor from "@uiw/react-md-editor";

type Props = {
  review: DBReview;
};

function Review({ review }: Props) {
  console.log(
    "DateTime.fromISO(review.createdAt).diffNow()",
    DateTime.fromISO(review.createdAt).diffNow()
  );

  return (
    <li role="article" className="space-y-2 border-b py-3 first:pt-0">
      {/* username and avatar */}
      <header className="flex items-center gap-x-1">
        <Link href={`/${review.username}`}>
          <Avatar size={32} avatarUrl={review.userDetails.avatar} />
        </Link>
        <Link href={`/${review.username}`} className="font-semibold">
          {review.userDetails.displayName}
        </Link>
        <time>{DateTime.fromISO(review.createdAt).diffNow().hours}</time>
      </header>

      {/* movie details */}
      <div className="flex gap-x-2">
        <Image
          className="w-32 shrink-0 rounded-sm"
          src={review.movieDetails.posterPath}
          alt={""}
          width={0}
          height={0}
          sizes="10rem"
        />

        <div className="space-y-1">
          <p className="text-base leading-6">
            {review.movieDetails.title} (
            {DateTime.fromISO(review.movieDetails.releaseDate).year})
          </p>
          <p className="text-sm text-gray-600">
            {review.movieDetails.genres.join(", ")}
          </p>
        </div>
      </div>

      {/* Review Details */}
      <div>
        <p className="inline-flex items-center gap-x-1.5 rounded-full bg-teal-100 px-2 py-1">
          <StarIcon className="w-4 fill-yellow-600 stroke-none" />
          <span className="text-base font-semibold">{review.rating}</span>
        </p>
        <MDEditor.Markdown source={review.review} />
      </div>
    </li>
  );
}

export default Review;
