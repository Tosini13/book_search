import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    color: {
      primary: string;
      success: string;
      error: string;
    };
  }
}
