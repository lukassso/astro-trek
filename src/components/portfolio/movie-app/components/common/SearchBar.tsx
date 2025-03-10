import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import type { ChangeEvent } from "react";
import { debounce } from "lodash";
import { useRef } from "react";
import type { SearchBarProps } from "@/features/movie-app/types";

const SearchBar = ({ onSearch, defaultValue }: SearchBarProps) => {
  const [inputValue, setInputValue] = useState(defaultValue);

  const debouncedSearch = useRef(
    debounce((value: string) => {
      onSearch(value);
    }, 300),
  ).current;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedSearch(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(inputValue);
  };

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative flex-1 pr-2 md:grow-0">
        <Search className="text-muted-foreground absolute left-2.5 top-2.5 h-4 w-4 dark:text-gray-950" />
        <Input
          type="search"
          placeholder="Search for movies..."
          className="bg-background w-full rounded-lg pl-8 dark:text-gray-950 md:w-[200px] lg:w-[336px]"
          value={inputValue}
          onChange={handleChange}
        />
      </div>
    </form>
  );
};

export default SearchBar;
