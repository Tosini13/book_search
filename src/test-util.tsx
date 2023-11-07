import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import GlobalProviders from "./Providers";

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: GlobalProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
