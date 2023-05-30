import Container from "@/components/container/Container";
import Logo from "@/components/logo/Logo";
import Tagline from "@/components/tagline/Tagline";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Container>
          <div className="space-y-8">
            <div className="flex justify-center">
              <Logo className="w-20" />
            </div>
            <Tagline />
          </div>
        </Container>
        {children}
      </body>
    </html>
  );
}
