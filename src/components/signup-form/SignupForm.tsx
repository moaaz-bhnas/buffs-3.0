"use client";

import InlineInput from "../inline-input/InlineInput";

type Props = {};

function handleSubmit() {}

function SignupForm({}: Props) {
  return (
    <form
      className="mx-auto max-w-md space-y-4 rounded-sm border bg-white p-8"
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <h2 className="title-1 text-center">Join the club</h2>
      <div className="space-y-2">
        <InlineInput
          type="email"
          classname="rounded-sm p-2"
          label="Email address"
          labelClassName="text-gray-500"
        />
        <InlineInput
          type="text"
          classname="rounded-sm p-2"
          label="Full name"
          labelClassName="text-gray-500"
        />
        <InlineInput
          type="text"
          classname="rounded-sm p-2"
          label="Username"
          labelClassName="text-gray-500"
        />
        <InlineInput
          type="password"
          classname="rounded-sm p-2"
          label="Password"
          labelClassName="text-gray-500"
        />
      </div>

      <button
        className="w-full rounded-md bg-teal-600 py-2 text-white"
        type="submit"
      >
        Sign Up
      </button>
    </form>
  );
}

export default SignupForm;
