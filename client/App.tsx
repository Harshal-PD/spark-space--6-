import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PlanetPage from "./pages/Planet";
import Planets from "./pages/Planets";
import Missions from "./pages/Missions";
import DataPage from "./pages/Data";
import AboutPage from "./pages/About";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import { ChatProvider } from "@/components/chatbot/ChatContext";
import ChatWidget from "@/components/chatbot/ChatWidget";
import ChatLauncher from "@/components/chatbot/ChatLauncher";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ChatProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/missions" element={<Missions />} />
                <Route path="/planets" element={<Planets />} />
                <Route path="/planets/:slug" element={<PlanetPage />} />
                <Route path="/data" element={<DataPage />} />
                <Route path="/about" element={<AboutPage />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
            <ChatWidget />
            <ChatLauncher />
          </div>
        </ChatProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
