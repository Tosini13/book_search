import { useEffect, useState, useCallback } from "react";
import { debounce } from "lodash";

type SearchFormPropsType = {
  setQuery: (q: string) => void;
};

const SearchForm: React.FC<SearchFormPropsType> = ({ setQuery }) => {
  const [value, setValue] = useState("");
  const debouncedSetQuery = useCallback(debounce(setQuery, 1000), []);

  useEffect(() => {
    debouncedSetQuery(value);
  }, [value]);

  return (
    <input
      name="query"
      placeholder="Search text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default SearchForm;
