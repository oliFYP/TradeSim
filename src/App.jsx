import React from "react";
import { AuthProvider } from "./context/AuthContext";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import DashboardPage from "./Pages/Dashboardpage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AuthPage from "./Pages/Authpage";
import { ThemeProvider } from "./context/ThemeContext";
import { StockDataProvider } from "./context/StockDataContext";
import MainPage from "./Pages/MainPage";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <StockDataProvider>
          <Router basename="/TradeSim">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route
                path="/dashboard/*"
                element={
                  <ProtectedRoute>
                    <MainPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Router>
        </StockDataProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
