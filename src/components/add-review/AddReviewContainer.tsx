import getCurrentUser from "@/utils/auth/getCurrentUser";
import Avatar from "../avatar/Avatar";
import ReviewModal from "./AddReviewModal";
import Link from "next/link";

type Props = {};

async function AddReviewContainer({}: Props) {
  const user = await getCurrentUser();

  return (
    <section
      className="flex gap-x-2 rounded-md bg-white p-3 shadow-sm"
      aria-label="Write a review"
    >
      <Link href="/profile">
        {/* @ts-expect-error Async Server Component */}
        <Avatar className="!w-10" />
      </Link>
      <div className="flex-1">
        <ReviewModal user={user} />
      </div>
    </section>
  );
}

export default AddReviewContainer;
