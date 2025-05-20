import React from "react";
import { Link } from "react-router-dom";

const CTASection = () => (
  <div className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900">
    <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
        <span className="block">Ready to start trading?</span>
        <span className="block">Create your account now.</span>
      </h2>
      <p className="mt-4 text-lg text-primary-200">
        Join thousands of traders who are learning and practicing with TradeSim.
      </p>
      <Link
        to="/auth"
        className="mt-8 inline-flex items-center px-5 py-3 text-base font-medium text-primary-600 bg-white rounded-md hover:bg-primary-50"
      >
        Sign up for free
      </Link>
    </div>
  </div>
);

export default CTASection;
