import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

type Props = {
  message: string;
};

function ErrorMessage({ message }: Props) {
  return (
    <motion.p
      className="flex items-center gap-x-1 rounded-md bg-red-100 px-2 py-1 text-sm text-red-700"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
    >
      <ExclamationCircleIcon className="w-4 shrink-0" />
      {message}
    </motion.p>
  );
}

export default ErrorMessage;
