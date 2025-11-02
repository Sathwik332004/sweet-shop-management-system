import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider, { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import AdminPage from "./pages/AdminPage";
import Sidebar, { DRAWER_WIDTH } from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { CssBaseline, Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

function AppContent() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [searchQuery, setSearchQuery] = useState("");
  const { signOut } = useAuth();

  const handleLogout = () => {
    signOut();
    toast.success("Logged out successfully 👋");
  };

  return (
    <>
      <CssBaseline />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#121b1f",
            color: "#fff",
            border: "1px solid rgba(102,153,40,0.4)",
            fontFamily: "Poppins, sans-serif",
          },
          success: { iconTheme: { primary: "#669928" } },
        }}
      />
      <Sidebar onLogout={handleLogout} />
      <Navbar onSearch={setSearchQuery} />
      <Box
        sx={{
          marginLeft: isMobile ? 0 : `${DRAWER_WIDTH}px`,
          marginTop: "64px",
          p: 3,
          background:
            "linear-gradient(135deg,#0b1218 0%,#121b1f 40%,#1e2c1a 100%)",
          minHeight: "calc(100vh - 64px)",
          color: "#fff",
          transition: "margin 0.25s ease",
        }}
      >
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardPage searchQuery={searchQuery} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute admin>
                <AdminPage searchQuery={searchQuery} />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Box>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}
