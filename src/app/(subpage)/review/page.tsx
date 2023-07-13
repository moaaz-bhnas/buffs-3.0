import AddReviewForm from "@/components/add-review/AddReviewForm";
import Container from "@/components/container/Container";
import SubpageHeader from "@/components/header/SubpageHeader";
import taglineMessages from "@/utils/messages/taglineMessages";
import { Metadata } from "next/types";

type Props = {};

export const metadata: Metadata = {
  title: "Buffs - Add Review",
  description: taglineMessages.default,
};

function ReveiwPage({}: Props) {
  return (
    <>
      <SubpageHeader title="Add Review" />

      <main>
        <Container>
          <AddReviewForm />
        </Container>
      </main>
    </>
  );
}

export default ReveiwPage;
