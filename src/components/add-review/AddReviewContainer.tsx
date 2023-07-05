"use client";

import ReviewModal from "./AddReviewModal";
import Link from "next/link";
import UserAvatar from "../avatar/UserAvatar";
import { Suspense } from "react";
import AvatarSkeleton from "../avatar/AvatarSkeleton";
import getServerUser from "@/helpers/auth/getServerUser";
import { AnimatePresence } from "framer-motion";
import SuccessMessage from "../alerts/SuccessMessage";
import successMessages from "@/utils/messages/successMessages";

type Props = {};

async function AddReviewContainer({}: Props) {
  const userResult = await getServerUser();

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
      {/* <AnimatePresence>
        {true && (
          <div className="fixed top-4">
            <SuccessMessage message={successMessages.review} />
          </div>
        )}
      </AnimatePresence> */}
    </section>
  );
}

export default AddReviewContainer;
