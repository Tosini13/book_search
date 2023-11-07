import { css } from "@emotion/css";
import { BookType } from "../../types";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import Image from "../Image/Image";

const BookContainer = styled.div`
  cursor: pointer;
  text-align: center;
  width: 200px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  border-radius: 0.5rem;
  background: rgb(10, 11, 26);
  background: linear-gradient(
    180deg,
    rgba(10, 11, 26, 0.8) 0%,
    rgba(10, 11, 26, 0.3) 100%
  );
  overflow: hidden;
  box-shadow: 0px 2px 14px 0px rgba(0, 0, 0, 0.1);
  &:hover {
    box-shadow: 0px 2px 20px 0px rgba(0, 0, 0, 0.2);
    & > div {
      transform: translateY(0px);
      box-shadow: inset 0px 11px 16px -10px rgba(0, 0, 0, 0.2);
    }
    & > img {
      scale: 1.01;
    }
  }
  transition-property: box-shadow, opacity;
  transition-duration: 0.2s;
`;

const BookLabel = styled.div`
  z-index: 2;
  position: absolute;
  background-color: #c4c1a7;
  bottom: 0;
  width: 100%;
  box-shadow: inset 0px 11px 16px -10px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  padding: 0.4rem;
  box-sizing: border-box;
  height: 6rem;
  transform: translateY(36px);
  transition-property: transform, box-shadow;
  transition-duration: 0.2s;
  transition-timing-function: ease-out;
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
  height: 1.8rem;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

type BookListItemPropsType = {
  book: BookType;
};

const BookListItem: React.FC<BookListItemPropsType> = ({ book }) => {
  const theme = useTheme();
  return (
    <BookContainer data-testid="book_list_item">
      <Image
        imgSrc={book.volumeInfo.imageLinks?.thumbnail}
        alt={`${book.volumeInfo.title} cover`}
      />
      <BookLabel>
        <div
          className={css`
            height: 3rem;
            display: grid;
            place-content: center;
          `}
        >
          <TitleLabel>{book.volumeInfo.title}</TitleLabel>
        </div>
        <AuthorLabel>
          {book.volumeInfo.authors?.length > 0
            ? book.volumeInfo.authors?.join(", ")
            : "No Authors"}
        </AuthorLabel>
      </BookLabel>
    </BookContainer>
  );
};

export default BookListItem;
