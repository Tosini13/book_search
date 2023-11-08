import { screen, fireEvent } from "@testing-library/react";
import Pagination from "./Pagination";
import { render } from "../../test-util";

const mockSetCurrentPage = jest.fn();

const defaultProps = {
  currentPage: 1,
  totalPages: 10,
  setCurrentPage: mockSetCurrentPage,
};

describe("Pagination Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    render(<Pagination {...defaultProps} />);
    expect(screen.getByTestId("arrow_prev")).toBeInTheDocument();
    expect(screen.getByTestId("arrow_next")).toBeInTheDocument();
  });

  it("disables the previous button when on the first page", () => {
    render(<Pagination {...defaultProps} currentPage={1} />);
    const prevButton = screen.getByTestId("arrow_prev");
    expect(prevButton).toHaveAttribute("disabled");
  });

  it("disables the next button when on the last page", () => {
    render(<Pagination {...defaultProps} currentPage={10} />);
    const nextButton = screen.getByTestId("arrow_next");
    expect(nextButton).toHaveAttribute("disabled");
  });

  it("calls setCurrentPage when a bullet page is clicked", () => {
    render(<Pagination {...defaultProps} currentPage={1} />);
    const bulletPage = screen.getByText("2");
    fireEvent.click(bulletPage);
    expect(mockSetCurrentPage).toHaveBeenCalledWith(2);
  });

  it("displays dots for front and back when appropriate", () => {
    render(<Pagination {...defaultProps} currentPage={5} />);
    const frontDots = screen.getByTestId("FRONT_DOTS");
    const backDots = screen.getByTestId("BACK_DOTS");
    expect(frontDots).toBeInTheDocument();
    expect(backDots).toBeInTheDocument();
  });

  it("displays active page with correct styling", () => {
    render(<Pagination {...defaultProps} currentPage={3} />);
    const activePage = screen.getByText("3");
    expect(activePage).toHaveClass("active");
  });

  it("displays interactive page with correct styling", () => {
    render(<Pagination {...defaultProps} currentPage={3} />);
    const interactivePage = screen.getByText("2");
    expect(interactivePage).toHaveClass("interactive-page");
  });
});
