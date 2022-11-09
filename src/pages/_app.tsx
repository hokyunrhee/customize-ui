import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { AppLayout } from "@/shared/app-layout";

type Component = AppProps["Component"] & {
  hasFullWidth: boolean;
};
type CustomAppProps = Omit<AppProps, "Component"> & { Component: Component };

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: CustomAppProps) {
  const { hasFullWidth } = Component;

  return (
    <ChakraProvider resetCSS>
      <QueryClientProvider client={queryClient}>
        {hasFullWidth ? (
          <Component {...pageProps} />
        ) : (
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        )}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default MyApp;
