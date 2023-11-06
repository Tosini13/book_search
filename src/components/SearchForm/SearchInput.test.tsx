import React from "react";
import SearchInput from "./SearchInput";
import { render, fireEvent, screen } from "@testing-library/react";

jest.mock("lodash", () => ({
  debounce: (fn: (q: string) => void) => fn,
}));

describe("SearchForm", () => {
  it("renders the component correctly", () => {
    render(<SearchInput setQuery={() => {}} />);
    const inputElement = screen.getByTestId("search_form");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("name", "query");
    expect(inputElement).toHaveAttribute("placeholder", "Search text");
  });

  it("updates the input value on change", () => {
    render(<SearchInput setQuery={() => {}} />);
    const inputElement = screen.getByTestId("search_form");

    fireEvent.change(inputElement, { target: { value: "Test Query" } });

    expect(inputElement).toHaveValue("Test Query");
  });

  it("calls setQuery with the debounced value", () => {
    const setQueryMock = jest.fn();
    render(<SearchInput setQuery={setQueryMock} />);
    const inputElement = screen.getByTestId("search_form");

    fireEvent.change(inputElement, { target: { value: "Test Query" } });

    expect(setQueryMock).toHaveBeenCalledWith("Test Query");
  });

  it("should display an error message", () => {
    const error = "An error occurred";
    render(<SearchInput setQuery={() => {}} error={error} />);
    const errorMessage = screen.getByText(error);
    expect(errorMessage).toBeInTheDocument();
  });
});
