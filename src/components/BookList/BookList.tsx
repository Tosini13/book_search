import { css } from "@emotion/css";
import { BookType } from "../../types";
import BookListItem from "./BookListItem";

type BookListPropsType = {
  books: BookType[];
};

const BookList: React.FC<BookListPropsType> = ({ books }) => {
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
      {books.map((item) => (
        <BookListItem key={item.id} book={item} />
      ))}
    </div>
  );
};

export default BookList;
