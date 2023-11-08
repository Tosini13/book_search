import { css } from "@emotion/css";
import styled from "@emotion/styled";
import ImagePlaceholder from "../Image/ImagePlaceholder";

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

const BookListItemPlaceholder: React.FC = () => {
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
        <ImagePlaceholder />
      </div>
      <div
        className={css`
          height: 3rem;
          display: grid;
          place-content: center;
        `}
      />
      <div
        className={css`
          height: 1.8rem;
          display: grid;
          place-content: center;
        `}
      />
    </BookContainer>
  );
};

export default BookListItemPlaceholder;
