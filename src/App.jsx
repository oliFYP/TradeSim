import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import DashboardPage from "./Pages/Dashboardpage";
import AuthPage from "./Pages/Authpage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/TradeSim" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;
