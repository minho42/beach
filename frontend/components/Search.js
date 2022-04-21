import { SearchIcon, XIcon } from "@heroicons/react/outline";

export function Search({ setSearchText }) {
  const searchInput = process.browser && document.querySelector("input");

  const handleChange = (e) => {
    if (e.target.value.trim().length === 0) return;

    setSearchText(e.target.value.trim());
  };

  const handleDelete = (e) => {
    searchInput.focus();
    searchInput.value = "";
    setSearchText("");
  };

  return (
    <div className="flex w-full max-w-sm relative px-2">
      <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />

      {searchInput && searchInput.value.length > 0 && (
        <button onClick={handleDelete}>
          <XIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400 hover:text-gray-500" />
        </button>
      )}
      <input
        onChange={handleChange}
        type="text"
        className="w-full rounded-lg px-10 py-2 border border-gray-300"
        placeholder="Search"
      />
    </div>
  );
}
