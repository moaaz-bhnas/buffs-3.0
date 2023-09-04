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
        <div className="flex justify-center">
          {/* Column 1: add review + reviews */}
          <div className="max-w-md space-y-8">
            <div className="hidden sm:block">
              <AddReviewSection user={userResult.value} />
            </div>

            <Feed user={userResult.value} reviews={reviewsResult.value} />
          </div>

          {/* Column 2: Streams */}
        </div>
      </Container>
    </main>
  );
}
