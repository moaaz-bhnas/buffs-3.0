import Container from "@/components/container/Container";
import SignupForm from "@/components/signup-form/SignupForm";
import taglineMessages from "@/utils/messages/taglineMessages";
import { Metadata } from "next";

type Props = {};

export const metadata: Metadata = {
  title: "Signup | Buffs",
  description: taglineMessages.default,
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
