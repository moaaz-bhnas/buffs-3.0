import Container from "@/components/container/Container";
import SigninForm from "@/components/signin-form/SigninForm";
import taglineMessages from "@/utils/messages/taglineMessages";
import { Metadata } from "next";

type Props = {};

export const metadata: Metadata = {
  title: "Buffs - Signin",
  description: taglineMessages.default,
};

function SignupPage({}: Props) {
  return (
    <main>
      <Container>
        <SigninForm />
      </Container>
    </main>
  );
}

export default SignupPage;
