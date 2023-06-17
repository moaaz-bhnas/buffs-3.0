import "@/app/globals.css";

import Container from "@/components/container/Container";
import Logo from "@/components/logo/Logo";
import classNames from "@/helpers/style/classNames";

import { Open_Sans } from "next/font/google";

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
        <Container>
          <Logo className="w-14" />
        </Container>
        {children}
      </body>
    </html>
  );
}
