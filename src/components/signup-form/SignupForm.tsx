"use client";

import { BaseSyntheticEvent, useState } from "react";
import InlineInput from "../inline-input/InlineInput";
import { RegisteringDBUser } from "@/interfaces/database/User";
import { ServerApiClient } from "@/apis/server-api-client";
import { useAsyncFn } from "react-use";
import ThemeButton from "../theme-button/ThemeButton";
import { useForm, useWatch } from "react-hook-form";
import emailValidationRegex from "@/utils/regex/emailValidationRegex";
import taglineMessages from "@/utils/messages/taglineMessages";
import errorMessages from "@/utils/messages/errorMessages";
import successMessages from "@/utils/messages/successMessages";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

type Props = {};

type TOnSubmit = (
  data: RegisteringDBUser,
  event: BaseSyntheticEvent<object, any, any> | undefined
) => Promise<void>;

const serverApiClient = new ServerApiClient();

function SignupForm({}: Props) {
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);

  // react-hook-form logic
  const {
    register,
    formState: { errors, isValid, isSubmitting },
    control,
    handleSubmit,
  } = useForm<RegisteringDBUser>();
  const watcher = useWatch({ control });

  const [onSubmitState, onSubmit] = useAsyncFn<TOnSubmit>(async (data) => {
    const result = await serverApiClient.signup(data);
    if (result.isErr()) {
      throw new Error(result.error.errorMessage);
    }
    setIsSuccess(true);
    Cookies.set("token", result.value.token, { expires: 30 });
    router.push("/");
  });

  return (
    <form
      className="space-y-8 sm:mx-auto sm:max-w-md sm:p-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <header className="space-y-1.5">
        <h2 className="title-1">Join the club</h2>
        <p className="text-gray-500">{taglineMessages.default}</p>
      </header>
      <div className="space-y-3">
        <InlineInput
          value={watcher.email || ""}
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
            validate: {
              emailAvailable: async (fieldValue) => {
                const result = await serverApiClient.getUserByEmail(fieldValue);
                if (result.isOk() && result.value.length > 0) {
                  return "Email already exists. Signin instead?";
                }
                return true;
              },
            },
          })}
          error={errors.email}
        />
        <InlineInput
          value={watcher.displayName || ""}
          type="text"
          classname="rounded-md p-2"
          label="Full name"
          labelClassName="text-gray-500"
          {...register("displayName", {
            required: "Display name is required",
          })}
          error={errors.displayName}
        />
        <InlineInput
          value={watcher.username || ""}
          type="text"
          classname="rounded-md p-2"
          label="Username"
          labelClassName="text-gray-500"
          {...register("username", {
            required: "Username is required",
            validate: {
              emailAvailable: async (fieldValue) => {
                const result = await serverApiClient.getUserByUsername(
                  fieldValue
                );
                if (result.isOk() && result.value.length > 0) {
                  return errorMessages.usernameUsed;
                }
                return true;
              },
            },
          })}
          error={errors.username}
        />
        <InlineInput
          value={watcher.password || ""}
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
        loading={isSubmitting}
        disabled={!isValid}
        errorMessage={onSubmitState.error && errorMessages.somthingWentWrong}
        successMessage={isSuccess ? successMessages.signup : undefined}
      >
        Sign Up
      </ThemeButton>
    </form>
  );
}

export default SignupForm;
