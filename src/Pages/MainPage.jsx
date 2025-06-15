import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "../components/Layout/Navbar";
import Sidebar from "../components/Layout/Sidebar";
import Watchlist from "../components/Dashboard/Watchlist";
import OrderForm from "../components/Dashboard/OrderForm";
import Portfolio from "../components/Dashboard/Portfolio";
import TransactionHistory from "../components/Dashboard/TransactionHistory";
import StockChart from "../components/Dashboard/StockChart";
import { useAuth } from "../context/AuthContext";

const MainPage = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="flex-1 flex overflow-hidden">
        <aside className="hidden md:block">
          <Sidebar />
        </aside>

        <main className="flex-1 overflow-y-auto p-6">
          <Routes>
            <Route path="/" element={<MainDashboard />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

const MainDashboard = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-5.5rem)]">
      <div className="lg:col-span-2 grid grid-rows-2 gap-6 h-full">
        <div className="row-span-1">
          <StockChart />
        </div>
        <div className="row-span-1 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Portfolio />
          </div>
          <div>
            <TransactionHistory />
          </div>
        </div>
      </div>
      <div className="grid grid-rows-2 gap-6 h-full">
        <div className="row-span-1">
          <Watchlist />
        </div>
        <div className="row-span-1">
          <OrderForm />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
