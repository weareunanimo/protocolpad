import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import Protocols from "./pages/Protocols";
import ProtocolBuilder from "./pages/ProtocolBuilder";
import Placeholder from "./pages/Placeholder";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/protocols" element={<Protocols />} />
            <Route path="/protocols/:id" element={<ProtocolBuilder />} />
            <Route path="/templates" element={<Placeholder title="Lab Templates" description="Evidence-based lab panels and interpretive frameworks" />} />
            <Route path="/insights" element={<Placeholder title="Insights" description="Clinical outcomes analytics across your practice" />} />
            <Route path="/settings" element={<Placeholder title="Settings" description="Practice preferences, integrations, and account" />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
