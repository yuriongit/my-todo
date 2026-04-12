import { QueryClientProvider, QueryClient, } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Home } from "../src/components/Home";

const queryClient = new QueryClient()

export const App = () => (
   <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <Home />
   </QueryClientProvider>
)
