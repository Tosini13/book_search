import { screen } from "@testing-library/react";
import BookListItem from "./BookListItem";
import { BookType } from "../../types";
import { render } from "../../test-util";

const mockBook: BookType = {
  id: "Mocked_id",
  volumeInfo: {
    title: "Sample Book Title",
    authors: ["Author 1", "Author 2"],
    imageLinks: {
      thumbnail: "sample-thumbnail-url",
    },
  },
};

describe("BookListItem", () => {
  it("should render book information correctly", () => {
    const bookProps = { book: mockBook };
    render(<BookListItem {...bookProps} />);

    const bookListItem = screen.getByTestId("book_list_item");
    const titleElement = screen.getByText(mockBook.volumeInfo.title);
    const authorElement = screen.getByText(
      mockBook.volumeInfo.authors?.join(", ") || "No Authors"
    );

    expect(bookListItem).toBeInTheDocument();
    expect(titleElement).toBeInTheDocument();
    expect(authorElement).toBeInTheDocument();
  });

  it("should handle missing author data", () => {
    const bookWithoutAuthors: BookType = {
      id: "Mocked_id",
      volumeInfo: {
        title: "Book without Authors",
        authors: [],
        imageLinks: {
          thumbnail: "sample-thumbnail-url",
        },
      },
    };

    const bookProps = { book: bookWithoutAuthors };
    render(<BookListItem {...bookProps} />);

    const authorElement = screen.getByText("No Authors");
    expect(authorElement).toBeInTheDocument();
  });

  it("should display a book cover image", () => {
    const bookProps = { book: mockBook };
    render(<BookListItem {...bookProps} />);

    const imageElement = screen.getByAltText(
      `${mockBook.volumeInfo.title} cover`
    );
    expect(imageElement).toBeInTheDocument();
  });

  it("should handle missing book cover image", () => {
    const bookWithoutImage: BookType = {
      id: "Mocked_id",
      volumeInfo: {
        title: "Book without Image",
        authors: ["Author 1"],
      },
    };

    const bookProps = { book: bookWithoutImage };
    render(<BookListItem {...bookProps} />);

    const imageElement = screen.queryByAltText(
      `${bookWithoutImage.volumeInfo.title} cover`
    );
    expect(imageElement).toBeNull();
  });
});
