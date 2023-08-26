import Header from "@/components/header/Header";
import "@/app/globals.css";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <NextTopLoader
          color="rgb(45 212 191)" // teal-400
          initialPosition={0.08}
          height={3}
          showSpinner={false}
          easing="ease"
          speed={200}
        />
        <Header />
        {children}
      </body>
    </html>
  );
}
