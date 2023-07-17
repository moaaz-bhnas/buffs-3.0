"use client";

import { useRouter } from "next/navigation";
import AddReviewForm from "../AddReviewForm";

type Props = {};

function AddReviewFormContainer({}: Props) {
  const router = useRouter();

  return <AddReviewForm onSuccess={() => router.push("/")} />;
}

export default AddReviewFormContainer;
