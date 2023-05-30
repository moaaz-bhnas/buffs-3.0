"use client";

import InlineInput from "../inline-input/InlineInput";

type Props = {};

function SignupForm({}: Props) {
  return (
    <form className="mx-auto max-w-md space-y-4 rounded-sm border bg-white p-8">
      <h2 className="title-1 text-center">Join the club</h2>
      <InlineInput
        type="email"
        classname="bg-gray-50 rounded-sm p-2"
        label="Email address"
        labelClassName="text-gray-500"
      />
    </form>
  );
}

export default SignupForm;
