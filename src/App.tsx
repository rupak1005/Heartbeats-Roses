
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Music from "./pages/Music";
import Gallery from "./pages/Gallery";

// Background configuration
export const backgrounds = [
  "backgrounds/bg1.jpg",
  "backgrounds/bg2.jpg",
  "backgrounds/bg3.jpg",
  "backgrounds/bg4.jpg",
  "backgrounds/bg5.jpg",
  "backgrounds/bg6.jpg",
  "backgrounds/bg7.jpg",
  "backgrounds/bg8.jpg",
  "backgrounds/bg9.jpg",
  "backgrounds/bg10.jpg",
  "backgrounds/bg11.jpg",
  "backgrounds/bg12.jpg",
  "backgrounds/bg13.jpg",
  "backgrounds/bg14.jpg",
  "backgrounds/bg15.jpg",
  "backgrounds/bg16.jpg",
];
 
// backgrounds that are considered dark (to adjust text color)
export const darkBackgrounds = [1, 3, 5, 8, 9, 10, 11,14,15]; // Indices of darker backgrounds

const queryClient = new QueryClient();

const App = () => {
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const [isDarkBackground, setIsDarkBackground] = useState(false);
  
  const changeBackground = () => {
    const newIndex = (backgroundIndex + 1) % backgrounds.length;
    setBackgroundIndex(newIndex);
    setIsDarkBackground(darkBackgrounds.includes(newIndex));
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {/* Background image with overlay */}
          <div className="fixed inset-0 z-10 opacity-100">
            <img 
              src={backgrounds[backgroundIndex]} 
              alt="Background" 
              className="w-full h-full object-cover"
            />
            <div className={`absolute inset-0 ${isDarkBackground ? 'bg-black/30' : 'bg-white/10'}`}></div>
          </div>
          
          <Navbar changeBackground={changeBackground} isDarkBackground={isDarkBackground} />
          <Routes>
            <Route path="/" element={<Index backgroundIndex={backgroundIndex} isDarkBackground={isDarkBackground} />} />
            <Route path="/music" element={<Music backgroundIndex={backgroundIndex} isDarkBackground={isDarkBackground} />} />
            <Route path="/gallery" element={<Gallery backgroundIndex={backgroundIndex} isDarkBackground={isDarkBackground} />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
