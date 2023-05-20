import Container from "@/components/container/Container";
import AddReview from "@/components/add-review/AddReviewSection";
import { Inter } from "next/font/google";
import { Metadata } from "next/types";
import Motion from "@/components/framer-motion/Motion";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Buffs - Feed",
  description:
    "Wanna share your thoughts on movies with other buffs? This is the place for you.",
};

export default function Home() {
  return (
    <main>
      {/* <Motion /> */}
      <Container>
        <div className="flex">
          <div className="w-full sm:w-3/5">
            {/* @ts-expect-error Async Server Component */}
            <AddReview />
          </div>
        </div>
      </Container>
    </main>
  );
}
