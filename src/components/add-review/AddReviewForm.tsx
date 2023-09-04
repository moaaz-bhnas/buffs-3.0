"use client";

import { FormEvent, useEffect, useRef, useState, useTransition } from "react";
import { TmdbDemoMovie } from "@/interfaces/tmdb/TmdbDemoMovie";
import { TmdbApiClient } from "@/apis/tmdb-api-client";
import classNames from "@/helpers/style/classNames";
import { TmdbImageSize } from "@/interfaces/tmdb/TmdbImageSize";
import { useUpdateEffect } from "usehooks-ts";
import { motion } from "framer-motion";
import SelectedMovieView from "./SelectedMovieView";
import SearchMovieView from "./SearchMovieView";
import { useAsyncFn } from "react-use";
import { RegisteringReview } from "@/interfaces/database/RegisteringReview";
import mapTmdbMovieToDBMovie from "@/helpers/reviews/mapTmdbMovieToDBMovie";
import { ServerApiClient } from "@/apis/server-api-client";
import ThemeButton from "../theme-button/ThemeButton";
import errorMessages from "@/utils/messages/errorMessages";
import ProgressSteps from "../progress-steps/ProgressSteps";

enum AddReviewStep {
  selectMovie = "Select Movie",
  review = "Review",
}

type Props = {
  onSuccess?: Function;
};

const tmdbApiClient = new TmdbApiClient();
const serverApiClient = new ServerApiClient();

type TOnSubmit = (event: FormEvent<HTMLFormElement>) => Promise<void>;

function AddReviewForm({ onSuccess = () => {} }: Props) {
  // refs
  const searchInputRef = useRef<HTMLInputElement>(null);

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

  // Effects
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

  useEffect(
    function focusSearchInput() {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    },
    [searchInputRef]
  );

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
      onSuccess();
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
    <form
      className={classNames("flex flex-col gap-y-4")}
      onSubmit={handleSubmit}
    >
      {/* Progress steps */}
      <ProgressSteps steps={steps} />

      {/* 1. Search view */}
      {activeStep === AddReviewStep.selectMovie && (
        <SearchMovieView
          ref={searchInputRef}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isLoadingResults={isLoadingResults}
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
            />
          </motion.div>

          <div className="mt-auto">
            <ThemeButton
              type="submit"
              className="w-full"
              loading={handleSubmitState.loading}
              errorMessage={
                handleSubmitState.error && errorMessages.somthingWentWrong
              }
              disabled={rating === 0}
            >
              Post
            </ThemeButton>
          </div>
        </>
      )}
    </form>
  );
}

export default AddReviewForm;
