import classNames from "@/helpers/style/classNames";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

function Container({ children, className = "" }: Props) {
  return (
    <div
      className={classNames(
        "mx-auto max-w-4xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8",
        className
      )}
    >
      <div className="mx-auto sm:max-w-2xl lg:max-w-none">{children}</div>
    </div>
  );
}

export default Container;
