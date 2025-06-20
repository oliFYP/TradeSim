import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Mail, Lock, ArrowRight } from "lucide-react";

const Login = ({ onToggleForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 rounded-lg bg-white dark:bg-gray-800 shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
        Sign In
      </h2>

      {error && (
        <div className="p-3 mb-4 text-sm border rounded text-red-500 border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
            htmlFor="email"
          >
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="email"
              type="email"
              className="pl-10 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-colors bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-6">
          <label
            className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
            htmlFor="password"
          >
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="password"
              type="password"
              className="pl-10 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-colors bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center items-center bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center">
              <span className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></span>
              Signing in...
            </span>
          ) : (
            <span className="flex items-center">
              Sign In
              <ArrowRight className="ml-2 h-4 w-4" />
            </span>
          )}
        </button>

        <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={onToggleForm}
            className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
