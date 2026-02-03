import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import { ThemeProvider } from "./contexts/theme-provider.tsx";
import { AuthProvider } from "./contexts/auth-provider.tsx";
import Navbar from "./components/navbar.tsx";
import Footer from "./components/footer.tsx";
import ProtectedRoute from "./components/protected-route.tsx";
import HomePage from "./pages/home.tsx";
import ContactPage from "./pages/contact.tsx";
import LoginPage from "./pages/login.tsx";
import DashboardPage from "./pages/dashboard.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AuthProvider>
          <Navbar />
          <main className="pt-16">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/admin" element={<LoginPage />} />
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
          </main>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
