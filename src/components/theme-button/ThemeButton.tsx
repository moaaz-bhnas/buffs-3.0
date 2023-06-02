import classNames from "@/utils/style/classNames";
import Spinner from "../spinner/Spinner";
import { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  children: ReactNode;
  type: "button" | "submit" | "reset";
  className?: string;
  loading?: boolean;
};

function ThemeButton({ children, type, className = "", loading }: Props) {
  return (
    <button
      className={classNames(
        "flex items-center justify-center gap-2 rounded-md bg-teal-600 py-2 text-white",
        className
      )}
      type={type}
    >
      {children}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          >
            <Spinner className="h-5 w-5 fill-teal-600" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}

export default ThemeButton;
