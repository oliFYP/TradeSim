import React from "react";
import { Link } from "react-router-dom";

function AuthPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-semibold mb-4">Authentication</h2>
        <p className="mb-4">This is the authentication page.</p>
        <Link
          to="/login"
          className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 mr-4"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
        >
          Sign Up
        </Link>
        {/* We'll add Login and Signup forms here later */}
      </div>
    </div>
  );
}

export default AuthPage;
