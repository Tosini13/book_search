import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    color: {
      primary: string;
      secondary: string;
      success: string;
      error: string;
      disabled: string;
    };
  }
}
