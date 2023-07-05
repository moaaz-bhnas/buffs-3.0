import { AnimatePresence } from "framer-motion";
import { Dispatch, ReactNode, SetStateAction, useEffect } from "react";

type Props = {
  visible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
};

function Notification({ visible, setIsVisible, children }: Props) {
  useEffect(
    function hideNotification() {
      let timeoutId: NodeJS.Timeout;
      if (visible) {
        timeoutId = setTimeout(() => {
          setIsVisible(false);
        }, 5000);
      }

      return () => {
        clearTimeout(timeoutId);
      };
    },
    [visible]
  );

  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed left-1/2 top-[4.5rem] -translate-x-1/2">
          {children}
        </div>
      )}
    </AnimatePresence>
  );
}

export default Notification;
