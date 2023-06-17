import classNames from "@/helpers/style/classNames";
import Spinner from "../spinner/Spinner";
import { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ErrorMessage from "../error/ErrorMessage";

type Props = {
  children: ReactNode;
  type: "button" | "submit" | "reset";
  error?: string;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
};

function ThemeButton({
  children,
  type,
  className = "",
  error,
  loading = false,
  disabled = false,
}: Props) {
  return (
    <div className="space-y-1">
      <button
        className={classNames(
          "flex items-center justify-center gap-2 rounded-md bg-teal-600 py-2 text-white",
          className,
          disabled ? "cursor-not-allowed opacity-50" : ""
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
      <AnimatePresence>
        {error && <ErrorMessage message={error} />}
      </AnimatePresence>
    </div>
  );
}

export default ThemeButton;
