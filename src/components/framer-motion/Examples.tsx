"use client";

import { motion } from "framer-motion";
import { useState } from "react";

type Props = {};

const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "-100%" },
};

function Examples({}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 
        - The animate prop can accept an object of values. 
        - When one of them changes, the motion component will automatically animate to the new state.
      */}
      <motion.div
        className="flex h-20 w-20 items-center justify-center rounded-full bg-teal-500"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Keyframes
      - Set a value as an array and Motion will animate through each of these values in turn.
      */}
      <motion.div
        className="flex h-20 w-20 items-center justify-center rounded-full bg-teal-500"
        animate={{
          scale: [1, 0.8, 0.8, 1, 1],
          rotate: [0, 0, 180, 180, 0],
          borderRadius: ["0%", "0%", "50%", "50%", "0%"],
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          times: [0, 0.2, 0.5, 0.8, 1],
          repeat: Infinity,
          repeatDelay: 1,
        }}
      >
        Keyframes
      </motion.div>

      {/* 
      - Variants are pre-defined visual states that a component can be in.
      - By using variants, a parent can easily orchestrate the animations of its children with special transition props like staggerChildren.
      */}
      <button onClick={() => setIsOpen((isOpen) => !isOpen)}>Toggle</button>
      <motion.div
        className="flex h-20 w-20 items-center justify-center rounded-full bg-teal-500"
        animate={isOpen ? "open" : "closed"}
        variants={variants}
      >
        Variants
      </motion.div>
    </>
  );
}

export default Examples;
