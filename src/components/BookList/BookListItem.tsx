import { css } from "@emotion/css";
import { BookType } from "../../types";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import Image from "../Image/Image";

const BookContainer = styled.div`
  cursor: pointer;
  text-align: center;
  width: 170px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 0.2rem;
  background-color: white;
  border: 1px solid #eeeeee;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  height: fit-content;
  margin-top: 5rem;
  gap: 0.4rem;

  box-shadow: 0px 2px 14px 0px rgba(0, 0, 0, 0);
  &:hover {
    box-shadow: 0px 2px 14px 0px rgba(0, 0, 0, 0.1);
    & > img {
      scale: 1.01;
    }
  }
  transition-property: box-shadow, opacity;
  transition-duration: 0.2s;
`;

const TitleLabel = styled.p`
  width: 100%;
  font-size: 1rem;
  text-overflow: ellipsis;
  word-wrap: break-word;
  overflow: hidden;
  line-height: 1.4rem;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const AuthorLabel = styled.p`
  font-size: 0.7rem;
  opacity: 0.6;
  line-height: 1rem;
  overflow: hidden;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

type BookListItemPropsType = {
  book: BookType;
};

const BookListItem: React.FC<BookListItemPropsType> = ({ book }) => {
  return (
    <BookContainer data-testid="book_list_item">
      <div
        className={css`
          margin-top: -5rem;
          box-shadow: 0px 2px 14px 0px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          border-radius: 0.2rem;
          width: 80%;
        `}
      >
        <Image
          imgSrc={book.volumeInfo.imageLinks?.thumbnail}
          alt={`${book.volumeInfo.title} cover`}
        />
      </div>
      <div
        className={css`
          height: 3rem;
          display: grid;
          place-content: center;
        `}
      >
        <TitleLabel>{book.volumeInfo.title}</TitleLabel>
      </div>
      <div
        className={css`
          height: 1.8rem;
          display: grid;
          place-content: center;
        `}
      >
        <AuthorLabel>
          {book.volumeInfo.authors?.length > 0
            ? book.volumeInfo.authors?.join(", ")
            : "No Authors"}
        </AuthorLabel>
      </div>
    </BookContainer>
  );
};

export default BookListItem;
