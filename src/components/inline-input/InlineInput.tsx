"use client";

import { RegisteringDBUser } from "@/interfaces/database/User";
import classNames from "@/helpers/style/classNames";
import {
  ChangeEventHandler,
  FocusEventHandler,
  forwardRef,
  useState,
} from "react";
import { FieldError, UseFormRegister } from "react-hook-form";
import ErrorMessage from "../alerts/ErrorMessage";
import { AnimatePresence } from "framer-motion";

type Props = {
  type: string;
  label: string;
  value: string;
  classname?: string;
  labelClassName?: string;
  error?: FieldError;
};

const InlineInput = forwardRef<
  HTMLInputElement,
  Props & ReturnType<UseFormRegister<RegisteringDBUser>>
>(
  (
    {
      type,
      label,
      value,
      onChange,
      onBlur,
      required,
      minLength,
      name,
      error,
      classname = "",
      labelClassName = "",
    },
    inputRef
  ) => {
    const [inputFocused, setInputFocused] = useState(false);

    const handleFocus: FocusEventHandler<HTMLInputElement> = (event) => {
      setInputFocused(true);
    };

    const handleBlur: FocusEventHandler<HTMLInputElement> = (event) => {
      setInputFocused(false);
      // onBlur from react-hook-form
      onBlur(event);
    };

    return (
      <div className="space-y-1">
        <label className="relative flex">
          <span
            className={classNames(
              "absolute left-1 self-center bg-white px-1 transition-all",
              labelClassName,
              inputFocused || value
                ? "-top-2.5 text-xs"
                : "top-1/2 -translate-y-1/2"
            )}
          >
            {label}
          </span>
          <input
            ref={inputRef}
            name={name}
            className={classNames("w-full border", classname)}
            onChange={onChange}
            type={type}
            onFocus={handleFocus}
            onBlur={handleBlur}
            autoComplete="new-password"
            required={required}
            minLength={minLength}
          />
        </label>
        <AnimatePresence>
          {error?.message && <ErrorMessage message={error.message} />}
        </AnimatePresence>
      </div>
    );
  }
);
InlineInput.displayName = "InlineInput";

export default InlineInput;
