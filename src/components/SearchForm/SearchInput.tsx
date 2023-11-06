import { useEffect, useState, useCallback } from "react";
import { debounce } from "lodash";
import styled from "@emotion/styled";

const InputStyled = styled.input<{ error?: boolean }>`
  background-color: transparent;
  color: #0a0b1a;
  padding: 0.5rem 1rem;
  border: none;
  border-bottom: 1px solid #0a0b1a;
  font-size: 1rem;
  margin: 2px auto;
  display: block;
  transition: border-color 150ms;
  &:focus {
    outline: none;
    border-color: ${(props) =>
      props.error ? props.theme.color.error : props.theme.color.success};
  }
`;

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
      <InputStyled
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
