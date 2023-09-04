import AddReviewFormContainer from "@/components/add-review/mobile/AddReviewFormContainer";
import Container from "@/components/container/Container";
import SubpageHeader from "@/components/header/SubpageHeader";
import taglineMessages from "@/utils/messages/taglineMessages";
import { Metadata } from "next/types";

type Props = {};

export const metadata: Metadata = {
  title: "Add Review | Buffs",
  description: taglineMessages.default,
};

function ReveiwPage({}: Props) {
  return (
    <>
      <SubpageHeader title="Add Review" />

      <main>
        <Container>
          <AddReviewFormContainer />
        </Container>
      </main>
    </>
  );
}

export default ReveiwPage;
