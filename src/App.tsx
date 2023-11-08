import { useState } from "react";
import SearchForm from "./components/SearchForm/SearchInput";
import { useQuery } from "@tanstack/react-query";
import { API } from "./API";
import { css } from "@emotion/css";
import { BookSearchResponseType } from "./types";
import BookList from "./components/BookList/BookList";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";

const Header = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  box-shadow: 0px 2px 14px 0px rgba(0, 0, 0, 0.1);
  background-color: white;

  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const LabelStyled = styled.p`
  color: ${(props) => props.theme.color.disabled};
  text-align: center;
  font-size: 0.8rem;
`;

function App() {
  const [query, setQuery] = useState("");
  const theme = useTheme();

  const { data, status } = useQuery<BookSearchResponseType>({
    queryKey: ["books", query],
    queryFn: (): Promise<BookSearchResponseType> =>
      fetch(API.getSearchBooks(query)).then((res) => res.json()),
    enabled: query.length > 2,
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <Header>
        <SearchForm setQuery={setQuery} />
      </Header>
      <div
        className={css`
          max-width: 900px;
          margin-left: auto;
          margin-right: auto;
        `}
      >
        <div
          className={css`
            margin-top: 1rem;
            margin-bottom: 1rem;
          `}
        >
          {
            {
              pending:
                query.length < 3 ? (
                  <LabelStyled>Write at least 3 letters</LabelStyled>
                ) : (
                  <LabelStyled>Loading...</LabelStyled>
                ),
              error: (
                <LabelStyled style={{ color: theme.color.error }}>
                  There was a problem
                </LabelStyled>
              ),
              success: data?.items.length ? (
                <BookList books={data.items} />
              ) : (
                <LabelStyled>No data to show</LabelStyled>
              ),
            }[status]
          }
        </div>
      </div>
    </>
  );
}

export default App;
