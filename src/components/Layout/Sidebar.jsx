import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="bg-gray-200 p-4 w-64">
      <h2 className="text-lg font-semibold mb-4">Navigation</h2>
      <ul>
        <li className="mb-2">
          <Link to="/dashboard" className="text-gray-700 hover:text-blue-500">
            Dashboard
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/portfolio" className="text-gray-700 hover:text-blue-500">
            Portfolio (Coming Soon)
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/watchlist" className="text-gray-700 hover:text-blue-500">
            Watchlist (Coming Soon)
          </Link>
        </li>
        <li className="mb-2">
          <Link
            to="/transactions"
            className="text-gray-700 hover:text-blue-500"
          >
            Transactions (Coming Soon)
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
