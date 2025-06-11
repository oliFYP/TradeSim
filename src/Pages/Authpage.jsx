import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import Login from "../components/Auth/Login";
import Signup from "../components/Auth/Signup";
import { DollarSign, Sun, Moon } from "lucide-react";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { isAuthenticated, isLoading } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  // Redirect to dashboard if already authenticated
  if (isAuthenticated && !isLoading) {
    return <Navigate to="/dashboard" replace />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 transition-colors">
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
          aria-label={
            theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
          }
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </button>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row">
        <div className="flex-1 flex items-center justify-center p-8 lg:p-12">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              <div className="flex items-center justify-center">
                <DollarSign className="h-12 w-12 text-primary-600 dark:text-primary-400" />
              </div>
              <h1 className="mt-4 text-3xl font-extrabold text-gray-900 dark:text-white">
                TradeSim
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Learn stock trading without risking real money
              </p>
            </div>

            {isLogin ? (
              <Login onToggleForm={toggleForm} />
            ) : (
              <Signup onToggleForm={toggleForm} />
            )}
          </div>
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center bg-primary-600 p-12">
          <div className="max-w-lg">
            <h2 className="text-3xl font-bold text-white mb-6">
              Experience Risk-Free Trading
            </h2>
            <ul className="space-y-4 text-white">
              <li className="flex items-center">
                <span className="mr-3 flex-shrink-0 rounded-full bg-white p-1">
                  <svg
                    className="h-4 w-4 text-primary-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </span>
                Start with $100,000 in virtual currency
              </li>
              <li className="flex items-center">
                <span className="mr-3 flex-shrink-0 rounded-full bg-white p-1">
                  <svg
                    className="h-4 w-4 text-primary-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </span>
                Trade stocks with real-time market data
              </li>
              <li className="flex items-center">
                <span className="mr-3 flex-shrink-0 rounded-full bg-white p-1">
                  <svg
                    className="h-4 w-4 text-primary-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </span>
                Track portfolio performance over time
              </li>
              <li className="flex items-center">
                <span className="mr-3 flex-shrink-0 rounded-full bg-white p-1">
                  <svg
                    className="h-4 w-4 text-primary-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </span>
                Learn trading strategies without risk
              </li>
              <li className="flex items-center">
                <span className="mr-3 flex-shrink-0 rounded-full bg-white p-1">
                  <svg
                    className="h-4 w-4 text-primary-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </span>
                Build confidence before trading real money
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
