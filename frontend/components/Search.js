import { SearchIcon } from "@heroicons/react/outline";

export function Search({ setSearchText }) {
  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="flex w-full max-w-sm relative px-2">
      <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
      <input
        onChange={handleChange}
        type="text"
        className="w-full rounded-lg px-10 py-2 border border-gray-300"
        placeholder="Search"
      />
    </div>
  );
}
