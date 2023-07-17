"use client";

import {
  Dispatch,
  FormEvent,
  ForwardedRef,
  SetStateAction,
  forwardRef,
  useEffect,
  useState,
  useTransition,
} from "react";
import { TmdbDemoMovie } from "@/interfaces/tmdb/TmdbDemoMovie";
import { TmdbApiClient } from "@/apis/tmdb-api-client";
import classNames from "@/helpers/style/classNames";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { TmdbImageSize } from "@/interfaces/tmdb/TmdbImageSize";
import { useUpdateEffect } from "usehooks-ts";
import { motion } from "framer-motion";
import SelectedMovieView from "./SelectedMovieView";
import useMeasure from "react-use-measure";
import SearchMovieView from "./SearchMovieView";
import { useAsyncFn } from "react-use";
import { RegisteringReview } from "@/interfaces/database/RegisteringReview";
import mapTmdbMovieToDBMovie from "@/helpers/reviews/mapTmdbMovieToDBMovie";
import { ServerApiClient } from "@/apis/server-api-client";
import ThemeButton from "../theme-button/ThemeButton";
import errorMessages from "@/utils/messages/errorMessages";
import ProgressSteps from "../progress-steps/ProgressSteps";
import { useRouter } from "next/navigation";

enum AddReviewStep {
  selectMovie = "Select Movie",
  review = "Review",
}

type Props = {
  setIsSuccess?: Dispatch<SetStateAction<boolean>>;
  closeModal?: () => void;
};

const tmdbApiClient = new TmdbApiClient();
const serverApiClient = new ServerApiClient();

type TOnSubmit = (event: FormEvent<HTMLFormElement>) => Promise<void>;

function AddReviewForm({
  // setIsSuccess = () => {},
  closeModal = () => {},
}: // searchInputRef: ForwardedRef<HTMLInputElement>
Props) {
  const router = useRouter();

  // controls view
  const [activeStep, setActiveStep] = useState(AddReviewStep.selectMovie);

  // review data
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  // Search logic
  const [_, startTransition] = useTransition();
  const [searchResults, setSearchResults] = useState<TmdbDemoMovie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<TmdbDemoMovie | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoadingResults, setIsLoadingResults] = useState(false);

  const handleSelectMovie = (movie: TmdbDemoMovie) => {
    setSelectedMovie(movie);
    setRating(0);
    setReviewText("");
    setActiveStep(AddReviewStep.review);
  };

  const searchAndSetResults = async (searchQuery: string): Promise<void> => {
    if (searchQuery === "") return;

    setIsLoadingResults(true);
    const searchResult = await tmdbApiClient.searchMovies(searchQuery, {
      withImages: true,
      TmdbImageSize: TmdbImageSize.lg,
    });
    if (searchResult.isOk()) {
      startTransition(() => {
        setSearchResults(searchResult.value);
        setIsLoadingResults(false);
      });
    } else {
      setIsLoadingResults(false);
    }
  };

  useEffect(() => {
    searchAndSetResults(searchQuery);
  }, [searchQuery]);

  useUpdateEffect(
    function clearResultsAfterLastAsyncFinishes() {
      if (!isLoadingResults && searchQuery === "") {
        startTransition(() => {
          setSearchResults([]);
        });
      }
    },
    [isLoadingResults, searchQuery]
  );

  // // height transition
  // const [formRef, formBounds] = useMeasure({ offsetSize: true });

  // submit
  const [isSuccess, setIsSuccess] = useState(false);
  const [handleSubmitState, handleSubmit] = useAsyncFn<TOnSubmit>(
    async (event) => {
      // 1. prevent default behaviour on submit
      event.preventDefault();
      if (!selectedMovie) {
        return;
      }
      // 2. Add director data to the selected movie
      const movieWithDirector = await tmdbApiClient.mapDirectorsToMovies([
        selectedMovie,
      ]);

      // 3. collect review data
      const movieDetailsResult = mapTmdbMovieToDBMovie(movieWithDirector[0]);

      const review: RegisteringReview = {
        movieDetails: movieDetailsResult,
        rating,
        review: reviewText,
      };

      // 2. Push
      const result = await serverApiClient.createReview(review);

      if (result.isErr()) {
        console.error(result.error.errorMessage);
        throw new Error(result.error.errorMessage);
      }

      setIsSuccess(true);
      router.back();
      // closeModal();
    },
    [rating, reviewText, selectedMovie]
  );

  // Progress steps
  const steps = [
    {
      name: AddReviewStep.selectMovie,
      isActive: activeStep === AddReviewStep.selectMovie,
      disabled: activeStep === AddReviewStep.selectMovie,
      isFinished: Boolean(selectedMovie),
      onClick: () => setActiveStep(AddReviewStep.selectMovie),
    },
    {
      name: AddReviewStep.review,
      isActive: activeStep === AddReviewStep.review,
      disabled: !selectedMovie,
      isFinished: isSuccess,
      onClick: () => setActiveStep(AddReviewStep.review),
    },
  ];

  return (
    // <motion.div
    //   animate={{
    //     height: formBounds.height,
    //     width: formBounds.width,
    //   }}
    //   transition={{ duration: 0.4, bounce: 0 }}
    // >
    <form
      // ref={formRef}
      className={classNames(
        "space-y-4"
        // selectedMovie ? "w-[50rem]" : "w-[30rem]"
      )}
      onSubmit={handleSubmit}
    >
      {/* <header className="flex items-center justify-between">
        <h2 className="font-semibold">Write a review</h2>
        <button
          className="bg-gray-20 flex h-10 w-10 rounded-full transition hover:bg-gray-300 focus:bg-gray-300"
          type="button"
          onClick={closeModal}
        >
          <XMarkIcon className="m-auto w-6" />
        </button>
      </header> */}

      {/* Progress steps */}
      <ProgressSteps steps={steps} />

      {/* 1. Search view */}
      {activeStep === AddReviewStep.selectMovie && (
        <SearchMovieView
          // ref={searchInputRef}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchResults={searchResults}
          onSelectMovie={handleSelectMovie}
        />
      )}

      {/* 2. Selected view */}
      {activeStep === AddReviewStep.review && selectedMovie && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <SelectedMovieView
              movie={selectedMovie}
              rating={rating}
              setRating={setRating}
              reviewText={reviewText}
              setReviewText={setReviewText}
              setSelectedMovie={setSelectedMovie}
            />
          </motion.div>

          <ThemeButton
            type="submit"
            className="w-full"
            loading={handleSubmitState.loading}
            errorMessage={
              handleSubmitState.error && errorMessages.somthingWentWrong
            }
            // successMessage={isSuccess ? successMessages.review : undefined}
            disabled={rating === 0}
          >
            Post
          </ThemeButton>
        </>
      )}
    </form>
    // </motion.div>
  );
}

export default AddReviewForm;
// export default forwardRef(AddReviewForm);
