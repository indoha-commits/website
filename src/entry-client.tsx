import { hydrateRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { AppShell } from "./App";
import { SiteRoutes } from "./routes";
import { SeoManager } from "./components/seo/SeoManager";
import "./index.css";

const queryClient = new QueryClient();

function ClientApp() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppShell>
          <SeoManager />
          <SiteRoutes />
        </AppShell>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

hydrateRoot(document.getElementById("root")!, <ClientApp />);
