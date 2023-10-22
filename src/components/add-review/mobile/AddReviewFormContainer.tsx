"use client";

import { useRouter } from "next/navigation";
import AddReviewForm from "../AddReviewForm";

type Props = {
  userDisplayName: string;
};

function AddReviewFormContainer({ userDisplayName }: Props) {
  const router = useRouter();

  return (
    <AddReviewForm
      userDisplayName={userDisplayName}
      onSuccess={() => router.push("/")}
    />
  );
}

export default AddReviewFormContainer;
