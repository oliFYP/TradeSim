import React from "react";
import Navbar from "../components/layout/Navbar";
import { Link } from "react-router-dom";
import TickerTape from "../components/layout/Tickertape";
import {
  DollarSign,
  TrendingUp,
  Shield,
  BookOpen,
  Users,
  ArrowRight,
} from "lucide-react";

const PresentationPage = () => {
  return (
    <div className="w-screen h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <TickerTape />
      <main>
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900">
          {/* Animated Trading Graph Background */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-800/30 to-primary-900/50" />
            <div className="h-full w-full">
              {/* Candlestick patterns */}
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={`candle-${i}`}
                  className="absolute w-3 bg-primary-300/30"
                  style={{
                    left: `${5 + i * 5}%`,
                    height: `${20 + Math.random() * 40}%`,
                    top: `${30 + Math.random() * 20}%`,
                    animation: `pulse-slow ${2 + Math.random() * 2}s infinite`,
                  }}
                >
                  <div
                    className="absolute w-0.5 left-1/2 -translate-x-1/2 bg-primary-300/30"
                    style={{
                      height: `${10 + Math.random() * 20}%`,
                      top: `-${5 + Math.random() * 10}%`,
                    }}
                  />
                  <div
                    className="absolute w-0.5 left-1/2 -translate-x-1/2 bg-primary-300/30"
                    style={{
                      height: `${10 + Math.random() * 20}%`,
                      bottom: `-${5 + Math.random() * 10}%`,
                    }}
                  />
                </div>
              ))}

              {/* Trend lines */}
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={`trend-${i}`}
                  className="absolute left-0 right-0 border-t border-primary-300/20"
                  style={{
                    top: `${15 + i * 12}%`,
                    transform: `skewY(${-15 + Math.random() * 30}deg)`,
                  }}
                />
              ))}

              {/* Volume bars */}
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={`volume-${i}`}
                  className="absolute bottom-0 w-3 bg-primary-400/10"
                  style={{
                    left: `${5 + i * 5}%`,
                    height: `${5 + Math.random() * 15}%`,
                    animation: `pulse-slow ${3 + Math.random() * 2}s infinite`,
                  }}
                />
              ))}

              {/* Moving averages */}
              <div
                className="absolute left-0 right-0 h-0.5 bg-primary-500/20"
                style={{
                  top: "45%",
                  transform: "skewY(-5deg)",
                  animation: "pulse-slow 4s infinite",
                }}
              />
              <div
                className="absolute left-0 right-0 h-0.5 bg-primary-300/20"
                style={{
                  top: "55%",
                  transform: "skewY(-8deg)",
                  animation: "pulse-slow 5s infinite",
                }}
              />
            </div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                <span className="block">Master Stock Trading</span>
                <span className="block text-primary-200">Without Risk</span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-primary-100 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Practice trading in a real-world simulation environment. Start
                with $100,000 in virtual currency and learn the ins and outs of
                stock trading.
              </p>
              <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                <div className="rounded-md shadow">
                  <Link
                    to="/auth"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-500 hover:bg-primary-400 md:py-4 md:text-lg md:px-10"
                  >
                    Start Trading Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="py-12 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">
                Features
              </h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Everything you need to learn trading
              </p>
            </div>

            <div className="mt-10">
              <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 md:justify-items-center">
                <div className="relative flex flex-col items-center">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <div className="mt-5 text-center">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                      Real-time Market Data
                    </h3>
                    <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                      Experience trading with real-time market prices and
                      trends.
                    </p>
                  </div>
                </div>

                <div className="relative flex flex-col items-center">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                    <Shield className="h-6 w-6" />
                  </div>
                  <div className="mt-5 text-center">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                      Risk-Free Trading
                    </h3>
                    <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                      Practice trading strategies without risking real money.
                    </p>
                  </div>
                </div>

                <div className="relative flex flex-col items-center">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <div className="mt-5 text-center">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                      Learning Resources
                    </h3>
                    <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                      Access educational content and trading tutorials.
                    </p>
                  </div>
                </div>

                <div className="relative flex flex-col items-center">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                    <Users className="h-6 w-6" />
                  </div>
                  <div className="mt-5 text-center">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                      Community
                    </h3>
                    <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                      Connect with other traders and share strategies.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-custom-gradient ">
          <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              <span className="block">Ready to start trading?</span>
              <span className="block">Create your account now.</span>
            </h2>
            <p className="mt-4 text-lg leading-6 text-primary-200">
              Join thousands of traders who are learning and practicing with
              TradeSim.
            </p>
            <Link
              to="/auth"
              className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-primary-50 sm:w-auto"
            >
              Sign up for free
            </Link>
          </div>
        </div>
      </main>

      <footer className="bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            <span className="text-gray-400 hover:text-gray-500">
              &copy; 2025 TradeSim. All rights reserved.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PresentationPage;
