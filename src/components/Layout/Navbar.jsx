import React from "react";
import { Link } from "react-router-dom";
import {
  DollarSign,
  TrendingUp,
  Shield,
  BookOpen,
  Users,
  ArrowRight,
} from "lucide-react";

function Navbar() {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-primary-600" />
            <span className="ml-2 text-2xl font-bold text-gray-900 dark:text-white">
              TradeSim
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/auth"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
