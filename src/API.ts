const endpoint = (path: string) => `https://www.googleapis.com/${path}`;

export const API = {
  getSearchBooks: (query: string) =>
    endpoint(
      `books/v1/volumes?q=${query}&key=${process.env.REACT_APP_API_KEY}`
    ),
};
