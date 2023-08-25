import "@/app/globals.css";

import Container from "@/components/container/Container";
import Logo from "@/components/logo/Logo";
import classNames from "@/helpers/style/classNames";

import { Open_Sans } from "next/font/google";
import NextTopLoader from "nextjs-toploader";

// display: https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display
const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={classNames(openSans.variable)}>
      <body className="font-open">
        <NextTopLoader
          color="rgb(45 212 191)" // teal-400
          initialPosition={0.08}
          height={3}
          showSpinner={false}
          easing="ease"
          speed={200}
        />
        <Container>
          <Logo className="w-14" />
        </Container>
        {children}
      </body>
    </html>
  );
}
