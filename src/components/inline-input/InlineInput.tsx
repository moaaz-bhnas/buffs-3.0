"use client";

import classNames from "@/utils/style/classNames";
import { Dispatch, SetStateAction, useState } from "react";

type Props = {
  type: string;
  label: string;
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
  classname?: string;
  labelClassName?: string;
};

function InlineInput({
  type,
  label,
  value,
  onChange,
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
          inputFocused || value ? "-top-4 text-sm" : "top-1/2 -translate-y-1/2"
        )}
      >
        {label}
      </span>
      <input
        className={classNames("w-full border", classname)}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        type={type}
        onFocus={() => setInputFocused(true)}
        onBlur={() => setInputFocused(false)}
        autoComplete="new-password"
      />
    </label>
  );
}

export default InlineInput;
