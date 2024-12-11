import { useGlobalContext } from "@/features/hacker-news/context";

const Pagination = () => {
  const { isLoading, page, nbPages, handlePage } = useGlobalContext();
  return (
    <div className="sticky top-0 flex items-center justify-between bg-bgcolor py-2">
      <div className="flex">
        <a
          onClick={() => handlePage("dec")}
          className="me-3 flex h-8 cursor-pointer items-center justify-center rounded-lg border border-gray-300 bg-white px-3 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          <svg
            className="me-2 h-3.5 w-3.5 rtl:rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path stroke="currentColor" d="M13 5H1m0 0 4 4M1 5l4-4" />
          </svg>
          Previous
        </a>
        <a
          onClick={() => handlePage("inc")}
          className="flex h-8 cursor-pointer items-center justify-center rounded-lg border border-gray-300 bg-white px-3 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Next
          <svg
            className="ms-2 h-3.5 w-3.5 rtl:rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path stroke="currentColor" d="M1 5h12m0 0L9 1m4 4L9 9" />
          </svg>
        </a>
      </div>
      <div>
        {isLoading ? (
          "loading..."
        ) : (
          <p>
            {page + 1} of {nbPages}
          </p>
        )}
      </div>
    </div>
  );
};

export default Pagination;
