"use client";

import { RegisteringDBUser } from "@/interfaces/database/User";
import classNames from "@/utils/style/classNames";
import { ChangeEventHandler, forwardRef, useState } from "react";
import { UseFormRegister } from "react-hook-form";

type Props = {
  type: string;
  label: string;
  classname?: string;
  labelClassName?: string;
};

const InlineInput = forwardRef<
  HTMLInputElement,
  Props & ReturnType<UseFormRegister<RegisteringDBUser>>
>(
  (
    { type, label, onChange, name, classname = "", labelClassName = "" },
    inputRef
  ) => {
    const [inputValue, setInputValue] = useState("");
    const [inputFocused, setInputFocused] = useState(false);

    const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
      setInputValue(event.target.value);
      onChange(event);
    };

    return (
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
        />
      </label>
    );
  }
);

export default InlineInput;
