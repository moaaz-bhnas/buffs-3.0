import Container from "@/components/container/Container";
import SignupForm from "@/components/signup-form/SignupForm";
import tagline from "@/config/content/tagline";
import { Metadata } from "next";

type Props = {};

export const metadata: Metadata = {
  title: "Buffs - Signup",
  description: tagline,
};

function SignupPage({}: Props) {
  return (
    <main>
      <Container>
        <SignupForm />
      </Container>
    </main>
  );
}

export default SignupPage;
