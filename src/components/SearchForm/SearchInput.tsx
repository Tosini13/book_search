import { useEffect, useState, useCallback } from "react";
import { debounce } from "lodash";

type SearchInputPropsType = {
  setQuery: (q: string) => void;
  error?: string;
};

const SearchInput: React.FC<SearchInputPropsType> = ({ setQuery, error }) => {
  const [value, setValue] = useState("");
  const debouncedSetQuery = useCallback(debounce(setQuery, 1000), []);

  useEffect(() => {
    debouncedSetQuery(value);
  }, [value]);

  return (
    <div>
      <input
        data-testid="search_form"
        name="query"
        placeholder="Search text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <span>{error}</span>
    </div>
  );
};

export default SearchInput;
