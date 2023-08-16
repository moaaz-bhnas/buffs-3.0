"use-client";

import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

type Props = {
  message: string;
};

function SuccessMessage({ message }: Props) {
  return (
    <motion.p
      className="flex items-center gap-x-1 rounded-md bg-green-100 px-2 py-1 text-sm text-green-900"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
    >
      <CheckCircleIcon className="w-4 shrink-0" />
      {message}
    </motion.p>
  );
}

export default SuccessMessage;
