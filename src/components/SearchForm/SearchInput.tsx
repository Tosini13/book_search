import { useEffect, useState, useCallback } from "react";
import { debounce } from "lodash";
import styled from "@emotion/styled";
import { css } from "@emotion/css";

const SearchLogo = () => (
  <svg
    width="17"
    height="20"
    viewBox="0 0 17 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="8.5"
      cy="9.04538"
      r="7.36706"
      transform="rotate(5.69932 8.5 9.04538)"
      stroke="#1E1E1E"
      strokeWidth="0.8"
    />
    <path
      d="M16.1851 19.4546L10.4555 12.4546"
      stroke="#1E1E1E"
      strokeWidth="0.8"
      strokeLinecap="round"
    />
  </svg>
);

const CloseLogo = () => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 7 6"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.999999 5.5L5.99999 0.500004"
      stroke="white"
      strokeWidth="0.8"
      strokeLinecap="round"
    />
    <path
      d="M6 5.5L1.00001 0.500004"
      stroke="white"
      strokeWidth="0.8"
      strokeLinecap="round"
    />
  </svg>
);

const InputStyled = styled.input<{ error?: boolean }>`
  background-color: ${(props) => props.theme.color.secondary} !important;
  color: #0a0b1a;
  padding: 0.5rem;
  border: none;
  font-size: 1rem;
  display: block;
  transition: border-color 150ms;
  &:focus {
    outline: none;
    border-color: ${(props) =>
      props.error ? props.theme.color.error : props.theme.color.success};
  }
`;

const InputContainerStyled = styled.div`
  background-color: ${(props) => props.theme.color.secondary};
  color: #0a0b1a;
  padding: 0.5rem 0.8rem;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

type SearchInputPropsType = {
  setQuery: (q: string) => void;
};

const SearchInput: React.FC<SearchInputPropsType> = ({ setQuery }) => {
  const [value, setValue] = useState("");
  const debouncedSetQuery = useCallback(debounce(setQuery, 1000), []);

  useEffect(() => {
    debouncedSetQuery(value);
  }, [value]);

  return (
    <InputContainerStyled>
      <SearchLogo />
      <InputStyled
        data-testid="search_form"
        name="query"
        placeholder="Search text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div
        className={css`
          background-color: black;
          padding: 0.3rem;
          aspect-ratio: 1/1;
          height: fit-content;
          display: grid;
          place-content: center;
          cursor: pointer;
          opacity: 1;
          &:hover {
            opacity: 0.8;
          }
        `}
        onClick={() => {
          setValue("");
          setQuery("");
        }}
      >
        <CloseLogo />
      </div>
    </InputContainerStyled>
  );
};

export default SearchInput;
