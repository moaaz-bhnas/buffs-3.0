type Props = {};

function MovieResultsSkeleton({}: Props) {
  const items = Array(8).fill(null);

  return (
    <ul className="grid grid-cols-3 gap-x-2 gap-y-4 p-1 sm:grid-cols-4 sm:gap-x-2.5">
      {items.map((_, index) => (
        <li
          className="aspect-[185/278] animate-load rounded-sm bg-gray-300"
          key={index}
        />
      ))}
    </ul>
  );
}

export default MovieResultsSkeleton;
