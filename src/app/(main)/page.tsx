import Container from "@/components/container/Container";
import AddReviewSection from "@/components/add-review/desktop/AddReviewSection";
import taglineMessages from "@/utils/messages/taglineMessages";
import { Inter } from "next/font/google";
import { Metadata } from "next/types";
import Feed from "@/components/feed/Feed";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Feed | Buffs",
  description: taglineMessages.default,
};

export default function Home() {
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
        <Feed />
      </Container>
    </main>
  );
}
