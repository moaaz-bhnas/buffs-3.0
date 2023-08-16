import { PlusIcon } from "@heroicons/react/24/outline";

function FavoriteMovies() {
  return (
    <div>
      <h1 className="text-lg font-normal tracking-wider text-slate-700">
        FAVORITE FILMS
      </h1>
      <hr className="h-px my-3 bg-gray-400 border-0" />
      <ul className="flex gap-3">
        <li className="w-1/3 h-48 md:h-[22rem] lg:h-96 bg-slate-300 rounded-md flex justify-center group hover:drop-shadow-xl ease-in duration-150 cursor-pointer">
          <PlusIcon className="w-12 h-12 md:w-20 md:h-20 m-auto opacity-20 group-hover:opacity-90 transition-opacity ease-in duration-150" />
        </li>
        <li className="w-1/3 h-48 md:h-[22rem] lg:h-96 bg-slate-300 rounded-md flex justify-center group hover:drop-shadow-xl ease-in duration-150 cursor-pointer">
          <PlusIcon className="w-12 h-12 md:w-20 md:h-20 m-auto opacity-20 group-hover:opacity-90 transition-opacity ease-in duration-150" />
        </li>
        <li className="w-1/3 h-48 md:h-[22rem] lg:h-96 bg-slate-300 rounded-md flex justify-center group hover:drop-shadow-xl ease-in duration-150 cursor-pointer">
          <PlusIcon className="w-12 h-12 md:w-20 md:h-20 m-auto opacity-20 group-hover:opacity-90 transition-opacity ease-in duration-150" />
        </li>
      </ul>
    </div>
  );
}

export default FavoriteMovies;
