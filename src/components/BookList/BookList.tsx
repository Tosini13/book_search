import { css } from "@emotion/css";
import { BookType } from "../../types";
import BookListItem from "./BookListItem";

type BookListPropsType = {
  children: React.ReactNode;
};

const BookList: React.FC<BookListPropsType> = ({ children }) => {
  return (
    <div
      data-testid="book_list"
      className={css`
        display: grid;
        gap: 1.5rem;
        grid-template-columns: repeat(1, 1fr);
        @media (min-width: 460px) {
          grid-template-columns: repeat(2, 1fr);
        }
        @media (min-width: 680px) {
          grid-template-columns: repeat(3, 1fr);
        }
        @media (min-width: 900px) {
          grid-template-columns: repeat(4, 1fr);
        }
      `}
    >
      {children}
    </div>
  );
};

export default BookList;
