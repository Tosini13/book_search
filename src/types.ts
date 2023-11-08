export type BookType = {
  id: string;
  volumeInfo: {
    title: string;
    authors: string[];
    imageLinks?: {
      thumbnail: string;
    };
  };
};

export type BookSearchResponseType = {
  kind: string;
  totalItems: number;
  items: BookType[];
};
