"use client";

import classNames from "@/utils/style/classNames";
import { useState } from "react";

type Props = {
  type: string;
  label: string;
  classname?: string;
  labelClassName?: string;
};

function InlineInput({
  type,
  label,
  classname = "",
  labelClassName = "",
}: Props) {
  const [inputFocused, setInputFocused] = useState(false);

  return (
    <label className="relative flex">
      <span
        className={classNames(
          "absolute left-1 self-center bg-white px-1 transition-all",
          labelClassName,
          inputFocused ? "-top-4 text-sm" : "top-1/2 -translate-y-1/2"
        )}
      >
        {label}
      </span>
      <input
        className={classNames("w-full border", classname)}
        type={type}
        onFocus={() => setInputFocused(true)}
        onBlur={() => setInputFocused(false)}
        autoComplete="new-password"
      />
    </label>
  );
}

export default InlineInput;
