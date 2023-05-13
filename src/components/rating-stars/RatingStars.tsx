import classNames from "@/utils/style/classNames";
import { StarIcon } from "@heroicons/react/24/outline";
import {
  Dispatch,
  KeyboardEventHandler,
  SetStateAction,
  useEffect,
  useRef,
} from "react";

type Props = {
  editable?: boolean;
  rating: number;
  setRating?: Dispatch<SetStateAction<number>>;
  starsCount?: number;
};

function RatingStars({
  starsCount = 5,
  rating,
  setRating = () => {},
  editable = true,
}: Props) {
  const starsRefs = useRef<HTMLLIElement[]>(Array(starsCount));

  useEffect(
    function focusActiveStar() {
      if (rating > 0) {
        starsRefs.current[rating - 1].focus();
      }
    },
    [rating]
  );

  const handleKeyDown: KeyboardEventHandler<HTMLUListElement> = (event) => {
    if (event.key === " " && !rating) {
      setRating(1);
    }
    if (
      (event.key === "ArrowRight" || event.key === "ArrowDown") &&
      rating < starsCount
    ) {
      setRating((oldRating) => oldRating + 1);
    }
    if ((event.key === "ArrowLeft" || event.key === "ArrowUp") && rating > 0) {
      setRating((oldRating) => oldRating - 1);
    }
  };

  return (
    <ul
      role="radiogroup"
      aria-label="Rating"
      className="flex"
      onKeyDown={editable ? handleKeyDown : () => {}}
    >
      {Array.from(Array(starsCount).keys()).map((index) => {
        let active: boolean;
        if (rating) {
          active = rating === index + 1;
        } else {
          active = index === 0;
        }

        return (
          <li
            role="radio"
            ref={(element) => {
              if (element) {
                starsRefs.current[index] = element;
              }
            }}
            aria-label={`${index + 1} star${index === 0 ? "" : "s"}`}
            aria-checked={rating ? active : false}
            key={index}
            tabIndex={active ? 0 : -1}
            className="hover:cursor-pointer focus:cursor-pointer"
            onClick={editable ? () => setRating(index + 1) : () => {}}
          >
            <StarIcon
              className={classNames(
                "w-8 transition-all duration-[25ms]",
                index < rating ? "fill-teal-500" : "fill-white"
              )}
            />
          </li>
        );
      })}
    </ul>
  );
}

export default RatingStars;
