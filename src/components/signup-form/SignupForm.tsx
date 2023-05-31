"use client";

import { FormEventHandler, useState } from "react";
import InlineInput from "../inline-input/InlineInput";
import { RegisteringDBUser } from "@/interfaces/database/User";
import tagline from "@/config/content/tagline";

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
      className="space-y-8 sm:mx-auto sm:max-w-md sm:rounded-md lg:p-4"
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <header className="space-y-1.5">
        <h2 className="title-1">Join the club</h2>
        <p className="text-gray-500">{tagline}</p>
      </header>
      <div className="space-y-3">
        <InlineInput
          value={email}
          onChange={setEmail}
          type="email"
          classname="rounded-md p-2"
          label="Email address"
          labelClassName="text-gray-500"
        />
        <InlineInput
          value={displayName}
          onChange={setDisplayName}
          type="text"
          classname="rounded-md p-2"
          label="Full name"
          labelClassName="text-gray-500"
        />
        <InlineInput
          value={username}
          onChange={setUserName}
          type="text"
          classname="rounded-md p-2"
          label="Username"
          labelClassName="text-gray-500"
        />
        <InlineInput
          value={password}
          onChange={setPassword}
          type="password"
          classname="rounded-md p-2"
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
