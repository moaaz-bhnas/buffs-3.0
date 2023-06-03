"use client";

import { BaseSyntheticEvent } from "react";
import InlineInput from "../inline-input/InlineInput";
import { RegisteringDBUser } from "@/interfaces/database/User";
import tagline from "@/config/content/tagline";
import { ServerApiClient } from "@/apis/server-api-client";
import { useAsyncFn } from "react-use";
import ThemeButton from "../theme-button/ThemeButton";
import { useForm } from "react-hook-form";
import emailRegex from "@/utils/regex/emailRegex";

type Props = {};

type TOnSubmit = (
  data: RegisteringDBUser,
  event: BaseSyntheticEvent<object, any, any> | undefined
) => Promise<void>;

const serverApiClient = new ServerApiClient();

function SignupForm({}: Props) {
  const { register, handleSubmit } = useForm<RegisteringDBUser>();

  const [onSubmitState, onSubmit] = useAsyncFn<TOnSubmit>(async (data) => {
    await serverApiClient.signup(data);
  });

  return (
    <form
      className="space-y-8 sm:mx-auto sm:max-w-md sm:p-4"
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <header className="space-y-1.5">
        <h2 className="title-1">Join the club</h2>
        <p className="text-gray-500">{tagline}</p>
      </header>
      <div className="space-y-3">
        <InlineInput
          type="email"
          classname="rounded-md p-2"
          label="Email address"
          labelClassName="text-gray-500"
          {...register("email")}
          required
          pattern={String(emailRegex)}
        />
        <InlineInput
          type="text"
          classname="rounded-md p-2"
          label="Full name"
          labelClassName="text-gray-500"
          {...register("displayName")}
          required
        />
        <InlineInput
          type="text"
          classname="rounded-md p-2"
          label="Username"
          labelClassName="text-gray-500"
          {...register("username")}
          required
        />
        <InlineInput
          type="password"
          classname="rounded-md p-2"
          label="Password"
          labelClassName="text-gray-500"
          {...register("password")}
          required
          minLength={6}
        />
      </div>

      <ThemeButton
        type="submit"
        className="w-full"
        loading={onSubmitState.loading}
      >
        Sign Up
      </ThemeButton>
    </form>
  );
}

export default SignupForm;
