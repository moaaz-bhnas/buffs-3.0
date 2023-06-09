"use client";

import { BaseSyntheticEvent } from "react";
import InlineInput from "../inline-input/InlineInput";
import { RegisteringDBUser } from "@/interfaces/database/User";
import tagline from "@/config/content/tagline";
import { ServerApiClient } from "@/apis/server-api-client";
import { useAsyncFn } from "react-use";
import ThemeButton from "../theme-button/ThemeButton";
import { useForm } from "react-hook-form";
import emailValidationRegex from "@/utils/regex/emailValidationRegex";

type Props = {};

type TOnSubmit = (
  data: RegisteringDBUser,
  event: BaseSyntheticEvent<object, any, any> | undefined
) => Promise<void>;

const serverApiClient = new ServerApiClient();

function SignupForm({}: Props) {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<RegisteringDBUser>();

  const [onSubmitState, onSubmit] = useAsyncFn<TOnSubmit>(async (data) => {
    await serverApiClient.signup(data);
  });

  return (
    <form
      className="space-y-8 sm:mx-auto sm:max-w-md sm:p-4"
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
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: emailValidationRegex,
              message: "Please enter a valid email",
            },
          })}
          error={errors.email}
        />
        <InlineInput
          type="text"
          classname="rounded-md p-2"
          label="Full name"
          labelClassName="text-gray-500"
          {...register("displayName", { required: "Display name is required" })}
          error={errors.displayName}
        />
        <InlineInput
          type="text"
          classname="rounded-md p-2"
          label="Username"
          labelClassName="text-gray-500"
          {...register("username", { required: "Username is required" })}
          error={errors.username}
        />
        <InlineInput
          type="password"
          classname="rounded-md p-2"
          label="Password"
          labelClassName="text-gray-500"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          error={errors.password}
        />
      </div>

      <ThemeButton
        type="submit"
        className="w-full"
        loading={onSubmitState.loading}
        disabled={!isValid}
      >
        Sign Up
      </ThemeButton>
    </form>
  );
}

export default SignupForm;
