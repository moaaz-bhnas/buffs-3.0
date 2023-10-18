type Props = {};

function LikersSkeleton({}: Props) {
  const skeletonItems = [1, 2, 3];

  return (
    <ul className="space-y-3">
      {skeletonItems.map((item) => (
        <li className="flex items-center gap-2">
          <div className="h-10 w-10 animate-pulse rounded-full bg-gray-300" />
          <div className="h-3 flex-1 animate-pulse bg-gray-300" />
        </li>
      ))}
    </ul>
  );
}

export default LikersSkeleton;
