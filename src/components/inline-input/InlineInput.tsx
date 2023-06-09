"use client";

import { RegisteringDBUser } from "@/interfaces/database/User";
import classNames from "@/utils/style/classNames";
import { ChangeEventHandler, forwardRef, useState } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";
import ErrorMessage from "../error/ErrorMessage";
import { AnimatePresence } from "framer-motion";

type Props = {
  type: string;
  label: string;
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
      onChange,
      required,
      minLength,
      name,
      error,
      classname = "",
      labelClassName = "",
    },
    inputRef
  ) => {
    const [inputValue, setInputValue] = useState("");
    const [inputFocused, setInputFocused] = useState(false);

    const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
      setInputValue(event.target.value);
      onChange(event);
    };

    return (
      <div className="space-y-1">
        <label className="relative flex">
          <span
            className={classNames(
              "absolute left-1 self-center bg-white px-1 transition-all",
              labelClassName,
              inputFocused || inputValue
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
            onChange={handleChange}
            type={type}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
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
