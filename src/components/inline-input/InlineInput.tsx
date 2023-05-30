"use client";

import classNames from "@/utils/style/classNames";
import { motion } from "framer-motion";
import { useState } from "react";
import useMeasure from "react-use-measure";

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

  const [labelRef, labelBounds] = useMeasure({ offsetSize: true });

  return (
    <label className="relative flex">
      <motion.span
        ref={labelRef}
        animate={{
          top: inputFocused ? "-1rem" : "auto",
        }}
        transition={{ duration: 0.1, bounce: 0 }}
        className={classNames("absolute left-2 self-center", labelClassName)}
      >
        {label}
      </motion.span>
      <input
        className={classNames("w-full border", classname)}
        type={type}
        onFocus={() => setInputFocused(true)}
        onBlur={() => setInputFocused(false)}
      />
    </label>
  );
}

export default InlineInput;
