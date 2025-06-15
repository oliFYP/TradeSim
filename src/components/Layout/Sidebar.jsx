import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  BarChart,
  PieChart,
  Clock,
  Settings,
  Users,
  DollarSign,
} from "lucide-react";

const NavItem = ({ to, icon, label, isActive }) => {
  return (
    <Link
      to={to}
      className={`flex items-center space-x-4 px-4 py-3 rounded-md transition-colors ${
        isActive
          ? "bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400"
          : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
      }`}
    >
      <div className="w-5 h-5">{icon}</div>
      <span>{label}</span>
    </Link>
  );
};

const Sidebar = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const navItems = [
    { to: "/dashboard", icon: <Home />, label: "Dashboard" },
    { to: "/dashboard/markets", icon: <BarChart />, label: "Markets" },
    { to: "/dashboard/portfolio", icon: <PieChart />, label: "Portfolio" },
    { to: "/dashboard/history", icon: <Clock />, label: "History" },
    { to: "/dashboard/social", icon: <Users />, label: "Social" },
    { to: "/dashboard/settings", icon: <Settings />, label: "Settings" },
  ];

  return (
    <div className="h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 w-64 flex flex-col">
      <div className="p-6">
        <div className="flex items-center">
          <DollarSign className="h-8 w-8 text-primary-600 dark:text-primary-400" />
          <span className="ml-2 text-2xl font-bold text-gray-800 dark:text-white">
            TradeSim
          </span>
        </div>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Trade virtual stocks risk-free
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavItem
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
              isActive={
                item.to === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname.startsWith(item.to)
              }
            />
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="bg-gray-50 dark:bg-gray-700 rounded-md p-3">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Simulation Mode
          </div>
          <div className="text-sm font-medium text-gray-800 dark:text-white mt-1">
            Paper Trading
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
