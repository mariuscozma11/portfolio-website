import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import { ThemeProvider } from "./contexts/theme-provider.tsx";
import Navbar from "./components/navbar.tsx";
import Footer from "./components/footer.tsx";
import HomePage from "./pages/home.tsx";
import ContactPage from "./pages/contact.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        <Footer />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
