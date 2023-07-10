import { AnimatePresence, motion } from "framer-motion";
import Spinner from "./Spinner";

type Props = {
  loading: boolean;
  className?: string;
};

function AnimatedSpinner({ loading, className = "" }: Props) {
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
        >
          <Spinner className={className} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AnimatedSpinner;
