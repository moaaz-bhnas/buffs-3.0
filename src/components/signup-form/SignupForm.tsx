"use client";

import { FormEvent, useState } from "react";
import InlineInput from "../inline-input/InlineInput";
import { RegisteringDBUser } from "@/interfaces/database/User";
import tagline from "@/config/content/tagline";
import { ServerApiClient } from "@/apis/server-api-client";
import { useAsyncFn } from "react-use";
import ThemeButton from "../theme-button/ThemeButton";

type Props = {};

type THandleSubmit = (event: FormEvent<HTMLFormElement>) => Promise<void>;

const serverApiClient = new ServerApiClient();

function SignupForm({}: Props) {
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [handleSubmitState, handleSubmit] = useAsyncFn<THandleSubmit>(
    async (event) => {
      event.preventDefault();

      // collect user data
      const user: RegisteringDBUser = {
        username,
        displayName,
        email,
        password,
        role: "user",
      };

      await serverApiClient.signup(user);
    },
    [email, displayName, username, password]
  );

  return (
    <form
      className="space-y-8 sm:mx-auto sm:max-w-md sm:p-4"
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

      <ThemeButton
        type="submit"
        className="w-full"
        loading={handleSubmitState.loading}
      >
        Sign Up
      </ThemeButton>
    </form>
  );
}

export default SignupForm;
