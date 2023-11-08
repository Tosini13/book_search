import { fireEvent, screen } from "@testing-library/react";
import Image from "./Image"; // Import your component and its related constants/types
import { render } from "../../test-util";

describe("Image Component", () => {
  it("renders with loading state when no image source provided", () => {
    render(<Image alt="Test Alt Text" />);
    const loadingIcon = screen.getByTestId("no_img_icon");
    expect(loadingIcon).toBeInTheDocument();
  });

  it("renders with error state and message when image source fails to load", async () => {
    render(<Image imgSrc="nonexistent-image.jpg" alt="Test Alt Text" />);
    const imageRef = await screen.getByTestId("image-img");
    fireEvent.error(imageRef);
    const errorIcon = await screen.findByTestId("error_icon");
    const errorMessage = screen.getByText("Could not load the image");

    expect(errorIcon).toBeInTheDocument();
    expect(errorMessage).toBeInTheDocument();
  });

  it("calls onLoad and sets state to SUCCESS when the image loads", async () => {
    const imgSrc = "valid-image.jpg";
    render(<Image imgSrc={imgSrc} alt="Test Alt Text" />);
    const imageRef = await screen.getByTestId("image-img");
    fireEvent.load(imageRef);
    expect(imageRef).toHaveAttribute("src", "valid-image.jpg");
  });
});
