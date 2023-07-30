import classNames from "@/helpers/style/classNames";
import { CheckIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";

interface Step {
  name: string;
  isActive: boolean;
  disabled: boolean;
  isFinished: boolean;
  onClick: () => void;
}

type Props = {
  steps: Step[];
};

function ProgressSteps({ steps }: Props) {
  return (
    <div className="flex items-center gap-x-2">
      {steps.map((step, index, array) => (
        <Fragment key={step.name}>
          <button
            type="button"
            className="flex items-center gap-x-1.5 text-sm font-medium"
            onMouseDown={(event) => event.preventDefault()}
            disabled={step.disabled}
            onClick={step.onClick}
          >
            <span
              className={classNames(
                "flex h-8 w-8 items-center justify-center rounded-full border",
                step.isActive && !step.isFinished
                  ? "border-none bg-gray-600 text-white"
                  : "",
                step.isFinished ? "border-none bg-teal-200" : ""
              )}
            >
              {step.isFinished ? <CheckIcon className="w-4" /> : index + 1}
            </span>

            <p>{step.name}</p>
          </button>

          {index !== array.length - 1 && (
            <span className="h-[1px] w-6 bg-gray-300" />
          )}
        </Fragment>
      ))}
    </div>
  );
}

export default ProgressSteps;
