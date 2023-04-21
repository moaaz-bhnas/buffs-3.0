import Image from "next/image";
import { Inter } from "next/font/google";
import { Metadata } from "next/types";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Buffs - Feed",
  description:
    "Wanna share your thoughts on movies with other buffs? This is the place for you.",
};

export default function Home() {
  return <main>Home</main>;
}
