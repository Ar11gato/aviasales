import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@ant-design/v5-patch-for-react-19";
import App from "./App.tsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import { MyContextProvider } from "./hooks/MyContextProvider.tsx";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <MyContextProvider>
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </MyContextProvider>
    </QueryClientProvider>
  </StrictMode>,
);
