import MoviesSearchInput from "./MoviesSearchInput";

type Props = {};

function AddReviewForm({}: Props) {
  return (
    <form className="space-y-3">
      <h2 className="font-semibold">Write a review</h2>

      <MoviesSearchInput />
    </form>
  );
}

export default AddReviewForm;
