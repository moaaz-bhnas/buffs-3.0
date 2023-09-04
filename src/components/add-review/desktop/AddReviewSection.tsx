import ReviewModal from "./AddReviewModal";
import Link from "next/link";
import UserAvatar from "../../avatar/UserAvatar";
import { Suspense } from "react";
import AvatarSkeleton from "../../avatar/AvatarSkeleton";
import { DBUser } from "@/interfaces/database/DBUser";

type Props = {
  user: DBUser;
};

function AddReviewSection({ user }: Props) {
  return (
    <section
      className="flex gap-x-2 rounded-md bg-white p-3 shadow"
      aria-label="Write a review"
    >
      <Link href="/profile">
        <Suspense fallback={<AvatarSkeleton />}>
          {/* @ts-expect-error Async Server Component */}
          <UserAvatar size={40} />
        </Suspense>
      </Link>
      <div className="flex-1">
        <ReviewModal userDisplayName={user.displayName} />
      </div>
    </section>
  );
}

export default AddReviewSection;
