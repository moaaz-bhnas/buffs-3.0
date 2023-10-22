import AddReviewFormContainer from "@/components/add-review/mobile/AddReviewFormContainer";
import Container from "@/components/container/Container";
import SubpageHeader from "@/components/header/SubpageHeader";
import getServerUser from "@/helpers/auth/getServerUser";
import taglineMessages from "@/utils/messages/taglineMessages";
import { Metadata } from "next/types";

type Props = {};

export const metadata: Metadata = {
  title: "Add Review | Buffs",
  description: taglineMessages.default,
};

async function ReveiwPage({}: Props) {
  const userResult = await getServerUser();

  if (userResult.isErr()) {
    return <></>;
  }

  return (
    <>
      <SubpageHeader title="Add Review" />

      <main>
        <Container>
          <AddReviewFormContainer
            userDisplayName={userResult.value.displayName}
          />
        </Container>
      </main>
    </>
  );
}

export default ReveiwPage;
