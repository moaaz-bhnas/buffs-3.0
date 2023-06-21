import { cookies } from "next/dist/client/components/headers";
import ReviewModal from "./AddReviewModal";
import Link from "next/link";
import { ServerApiClient } from "@/apis/server-api-client";
import UserAvatar from "../avatar/UserAvatar";
import { Suspense } from "react";
import AvatarSkeleton from "../avatar/AvatarSkeleton";

type Props = {};

const serverApiClient = new ServerApiClient();

async function AddReviewContainer({}: Props) {
  const authToken = cookies().get("token")?.value;
  const userResult = await serverApiClient.getUserByToken(authToken || "");

  if (userResult.isErr()) {
    return <></>;
  }

  return (
    <section
      className="flex gap-x-2 rounded-md bg-white p-3 shadow-sm"
      aria-label="Write a review"
    >
      <Link href="/profile">
        <Suspense fallback={<AvatarSkeleton />}>
          {/* @ts-expect-error Async Server Component */}
          <UserAvatar size={40} />
        </Suspense>
      </Link>
      <div className="flex-1">
        <ReviewModal userDisplayName={userResult.value.displayName} />
      </div>
    </section>
  );
}

export default AddReviewContainer;
