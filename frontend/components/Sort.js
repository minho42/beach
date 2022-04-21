import { ChatIcon, ThumbUpIcon, ChartSquareBarIcon } from "@heroicons/react/outline";

export function Sort({ sortOption, setSortOption }) {
  return (
    <div className="flex items-center justify-center space-x-2">
      <div className="">Sort by</div>
      <button
        onClick={() => setSortOption("default")}
        className={`${
          sortOption === "default" ? "bg-amber-200 hover:bg-amber-300" : "bg-gray-200 hover:bg-gray-300"
        } flex flex-col items-center rounded-lg px-2 py-1`}
      >
        <ChartSquareBarIcon className="w-7 h-7 " />
        default
      </button>
      <button
        onClick={() => setSortOption("reviews")}
        className={`${
          sortOption === "reviews" ? "bg-amber-200 hover:bg-amber-300" : "bg-gray-200 hover:bg-gray-300"
        } flex flex-col items-center rounded-lg px-2 py-1`}
      >
        <ChatIcon className="w-7 h-7 " />
        reviews
      </button>
      <button
        onClick={() => setSortOption("stars")}
        className={`${
          sortOption === "stars" ? "bg-amber-200 hover:bg-amber-300" : "bg-gray-200 hover:bg-gray-300"
        } flex flex-col items-center rounded-lg px-2 py-1`}
      >
        <ThumbUpIcon className="w-7 h-7 " />
        stars
      </button>
    </div>
  );
}
