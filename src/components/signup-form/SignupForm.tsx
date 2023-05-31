"use client";

import { FormEventHandler, useState } from "react";
import InlineInput from "../inline-input/InlineInput";
import { RegisteringDBUser } from "@/interfaces/database/User";

type Props = {};

function SignupForm({}: Props) {
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    // collect user data
    const user: RegisteringDBUser = {
      username,
      displayName,
      email,
      password,
      role: "user",
    };

    console.log({ user });
  };

  return (
    <form
      className="mx-auto max-w-md space-y-4 rounded-sm border bg-white p-8"
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <h2 className="title-1 text-center">Join the club</h2>
      <div className="space-y-2">
        <InlineInput
          value={email}
          onChange={setEmail}
          type="email"
          classname="rounded-sm p-2"
          label="Email address"
          labelClassName="text-gray-500"
        />
        <InlineInput
          value={displayName}
          onChange={setDisplayName}
          type="text"
          classname="rounded-sm p-2"
          label="Full name"
          labelClassName="text-gray-500"
        />
        <InlineInput
          value={username}
          onChange={setUserName}
          type="text"
          classname="rounded-sm p-2"
          label="Username"
          labelClassName="text-gray-500"
        />
        <InlineInput
          value={password}
          onChange={setPassword}
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
