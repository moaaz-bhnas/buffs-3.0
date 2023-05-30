import Container from "@/components/container/Container";
import SignupForm from "@/components/signup-form/SignupForm";

type Props = {};

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
