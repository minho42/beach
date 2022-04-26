import { ChatIcon, StarIcon } from "@heroicons/react/outline";

export function Sort({ sortOption, setSortOption }) {
  return (
    <div className="flex items-center justify-center space-x-2">
      <div className="">Sort by</div>
      <button
        onClick={() => setSortOption("reviews")}
        className={`${
          sortOption === "reviews" ? "bg-amber-300" : "bg-gray-200 hover:bg-gray-300"
        } flex flex-col items-center rounded-lg px-2 py-1 text-sm uppercase`}
      >
        <ChatIcon className="w-7 h-7 " />
        reviews
      </button>
      <button
        onClick={() => setSortOption("stars")}
        className={`${
          sortOption === "stars" ? "bg-amber-300" : "bg-gray-200 hover:bg-gray-300"
        } flex flex-col items-center rounded-lg px-2 py-1 text-sm uppercase`}
      >
        <StarIcon className="w-7 h-7 " />
        stars
      </button>
    </div>
  );
}
