import { fireEvent } from "@testing-library/react";
import FilterSelect from "./FilterSelect"; // Import your component here
import { render } from "../../test-util";

const sampleProps = {
  value: "option1",
  onChange: jest.fn(),
  options: {
    option1: "Option 1",
    option2: "Option 2",
  },
};
describe("FilterSelect", () => {
  test("renders FilterSelect component", () => {
    const { getByTestId, getByText } = render(
      <FilterSelect {...sampleProps} />
    );

    const selectForm = getByTestId("select_form");
    expect(selectForm).toBeInTheDocument();

    expect(getByText("Option 1")).toBeInTheDocument();
    expect(getByText("Option 2")).toBeInTheDocument();
  });

  test("calls onChange when an option is selected", () => {
    const { getByTestId } = render(<FilterSelect {...sampleProps} />);

    const selectForm = getByTestId("select_form");

    fireEvent.change(selectForm, { target: { value: "option2" } });
    expect(sampleProps.onChange).toHaveBeenCalledWith("option2");
  });
});
