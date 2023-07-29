import Container from "@/components/container/Container";
import AddReviewSection from "@/components/add-review/desktop/AddReviewSection";
import taglineMessages from "@/utils/messages/taglineMessages";
import { Inter } from "next/font/google";
import { Metadata } from "next/types";
import Feed from "@/components/feed/Feed";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Buffs - Feed",
  description: taglineMessages.default,
};

export default function Home() {
  return (
    <main>
      <h1>test</h1>
      {/* <Motion /> */}
      <Container>
        <div className="flex">
          <div className="hidden sm:block sm:w-3/5">
            {/* @ts-expect-error Async Server Component */}
            <AddReviewSection />
          </div>
        </div>
      </Container>

      <Container>
        {/* @ts-expect-error Async Server Component */}
        <Feed />
      </Container>
    </main>
  );
}
