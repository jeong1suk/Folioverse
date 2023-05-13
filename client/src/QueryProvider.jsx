//담당 : 이승현

import { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import LoadingOverLay from "./components/LoadingOverLay";

const QueryProvider = ({ children }) => {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        suspense: true,
      },
    },
  });

  return (
    <Suspense fallback={<LoadingOverLay />}>
      <QueryClientProvider client={client}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Suspense>
  );
};

export default QueryProvider;
