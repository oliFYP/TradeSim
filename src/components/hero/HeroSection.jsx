import React from "react";
import { Link } from "react-router-dom";
import TickerTape from "../Layout/TickerTape";

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900">
      <TickerTape />
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-800/30 to-primary-900/50" />
        <div className="h-full w-full">
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
            Practice trading in a real-world simulation environment. Start with
            $100,000 in virtual currency and learn the ins and outs of stock
            trading.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
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
  );
};

export default HeroSection;
