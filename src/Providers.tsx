import React from "react";
import { ThemeProvider } from "@emotion/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import styled from "@emotion/styled";

const theme = {
  color: {
    primary: "#0c0e24",
    secondary: "#F3F3F3",
    success: "green",
    error: "red",
    disabled: "#303338",
  },
};

const GlobalStyle = styled.div`
  color: ${(props) => props.theme.color.primary};
`;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

type GlobalProvidersPropsType = {
  children: React.ReactNode;
};

const GlobalProviders: React.FC<GlobalProvidersPropsType> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle>{children}</GlobalStyle>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default GlobalProviders;
