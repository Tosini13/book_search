import { useEffect, useRef, useState } from "react";
import SearchForm from "./components/SearchForm/SearchInput";
import { useQuery } from "@tanstack/react-query";
import { API } from "./API";
import { css } from "@emotion/css";
import { BookSearchResponseType } from "./types";
import BookList from "./components/BookList/BookList";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import Pagination from "./components/Pagination/Pagination";
import BookListItem from "./components/BookList/BookListItem";
import BookListItemPlaceholder from "./components/BookList/BookListItemPlaceholder";
import { times } from "lodash";
import FilterSelect from "./components/SearchForm/FilterSelect";

const filterOptions = {
  "": "No Filter",
  partial: "Partial",
  full: "Full",
  "free-ebooks": "Free Ebooks",
  "paid-ebooks": "Paid Ebooks",
  ebooks: "Ebooks",
};

const Header = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1rem 0.2rem;
  box-shadow: 0px 2px 14px 0px rgba(0, 0, 0, 0.1);
  background-color: white;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  z-index: 10;

  @media (max-width: 440px) {
    flex-direction: column;
    align-items: stretch;
    & > div {
      margin-left: auto;
      margin-right: auto;
    }
  }
`;

const LabelStyled = styled.p`
  color: ${(props) => props.theme.color.disabled};
  text-align: center;
  font-size: 0.8rem;
`;

const MAX_COUNT_ITEMS_ON_PAGE = 12;

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<string>("");
  const theme = useTheme();
  const placeholderTotalCount = useRef<number>(0);

  const { data, status } = useQuery<BookSearchResponseType>({
    queryKey: ["books", query, currentPage, filter],
    queryFn: (): Promise<BookSearchResponseType> =>
      fetch(
        API.getSearchBooks(
          query,
          {
            currentPage: currentPage - 1,
            maxCount: MAX_COUNT_ITEMS_ON_PAGE,
          },
          filter
        )
      )
        .then((res) => res.json())
        .then((res) => {
          if (res.error) {
            throw new Error(res.error.message);
          }

          return res;
        }),
    enabled: query.length > 2,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!data?.totalItems) return;
    placeholderTotalCount.current = data.totalItems;
  }, [data?.totalItems]);

  return (
    <>
      <Header>
        <div
          className={css`
            width: 220px;
            max-width: 100%;
          `}
        >
          <SearchForm setQuery={setQuery} />
        </div>
        <div
          className={css`
            width: 220px;
            max-width: 100%;
          `}
        >
          <FilterSelect
            value={filter}
            onChange={setFilter}
            options={filterOptions}
          />
        </div>
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
                  <>
                    <BookList>
                      {times(MAX_COUNT_ITEMS_ON_PAGE).map((_, index) => (
                        <BookListItemPlaceholder key={index} />
                      ))}
                    </BookList>
                    <Pagination
                      currentPage={currentPage}
                      totalPages={Math.ceil(
                        placeholderTotalCount.current / MAX_COUNT_ITEMS_ON_PAGE
                      )}
                      setCurrentPage={setCurrentPage}
                    />
                  </>
                ),
              error: (
                <LabelStyled style={{ color: theme.color.error }}>
                  There was a problem
                </LabelStyled>
              ),
              success: data?.items?.length ? (
                <>
                  <BookList>
                    {data.items.map((item) => (
                      <BookListItem
                        key={`${item.id}_${currentPage}`}
                        book={item}
                      />
                    ))}
                  </BookList>
                  <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(
                      data.totalItems / MAX_COUNT_ITEMS_ON_PAGE
                    )}
                    setCurrentPage={setCurrentPage}
                  />
                </>
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
