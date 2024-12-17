import { useGlobalContext } from "@/features/hacker-news/context";

const Search = () => {
  const { handleSearch, query } = useGlobalContext();

  return (
    <div>
      <input
        type="text"
        className="focus:shadow-outlin w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search"
        aria-label="Search"
      />
    </div>
  );
};

export default Search;
