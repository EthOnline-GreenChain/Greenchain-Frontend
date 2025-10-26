import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Ledger from "./pages/Ledger";
import NotFound from "./pages/NotFound";
import Procure from "./pages/Procure";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

import {
  NotificationProvider,
  TransactionPopupProvider,
} from "@blockscout/app-sdk";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <NotificationProvider>
        <TransactionPopupProvider>
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <AppLayout>
                    <Dashboard />
                  </AppLayout>
                }
              />
              <Route
                path="/procure"
                element={
                  <AppLayout>
                    <Procure />
                  </AppLayout>
                }
              />
              <Route
                path="/ledger"
                element={
                  <AppLayout>
                    <Ledger />
                  </AppLayout>
                }
              />
              <Route
                path="/settings"
                element={
                  <AppLayout>
                    <Settings />
                  </AppLayout>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TransactionPopupProvider>
      </NotificationProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
