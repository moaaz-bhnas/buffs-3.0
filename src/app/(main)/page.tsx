import Container from "@/components/container/Container";
import AddReviewSection from "@/components/add-review/desktop/AddReviewSection";
import taglineMessages from "@/utils/messages/taglineMessages";
import { Metadata } from "next/types";
import Feed from "@/components/feed/Feed";
import getServerToken from "@/helpers/auth/getServerToken";
import { ServerApiClient } from "@/apis/server-api-client";
import getServerUser from "@/helpers/auth/getServerUser";

export const metadata: Metadata = {
  title: "Feed | Buffs",
  description: taglineMessages.default,
};

const serverApiClient = new ServerApiClient();

export default async function Home() {
  const authToken = getServerToken();
  const userResult = await getServerUser();
  const reviewsResult = await serverApiClient.getReviews(authToken);

  if (reviewsResult.isErr() || userResult.isErr()) {
    return <></>;
  }

  return (
    <main>
      <Container>
        <div className="flex">
          <div className="hidden sm:block sm:w-3/5">
            {/* @ts-expect-error Async Server Component */}
            <AddReviewSection />
          </div>
        </div>
      </Container>

      <Container>
        <Feed user={userResult.value} reviews={reviewsResult.value} />
      </Container>
    </main>
  );
}
