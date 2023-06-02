import classNames from "@/utils/style/classNames";
import Spinner from "../spinner/Spinner";
import { ReactNode } from "react";

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
      {loading && <Spinner className="h-5 w-5 fill-teal-600" />}
    </button>
  );
}

export default ThemeButton;
