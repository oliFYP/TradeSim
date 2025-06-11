import React from "react";
import { TrendingUp, Shield, BookOpen, Users } from "lucide-react";

const features = [
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: "Real-time Market Data",
    description: "Experience trading with real-time market prices and trends.",
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Risk-Free Trading",
    description: "Practice trading strategies without risking real money.",
  },
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: "Learning Resources",
    description: "Access educational content and trading tutorials.",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Community",
    description: "Connect with other traders and share strategies.",
  },
];

const FeaturesSection = () => (
  <section className="relative py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
    <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center">
      <h2 className="text-sm font-semibold tracking-widest text-primary-600 uppercase">
        Features
      </h2>
      <p className="mt-4 text-4xl font-bold text-gray-900 dark:text-white">
        All-in-One Trading Toolkit
      </p>
      <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
        Learn, practice, and grow with features tailored for both beginners and
        pros.
      </p>

      <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`relative group  rounded-3xl bg-white dark:bg-gray-700 shadow-xl p-6 transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl ${
              index % 2 === 0 ? "sm:-mt-4" : "sm:mt-4"
            }`}
          >
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary-500 text-white mb-4 mx-auto shadow-md group-hover:scale-110 transition-transform">
              {feature.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {feature.title}
            </h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              {feature.description}
            </p>
            <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-primary-500/10 pointer-events-none group-hover:ring-2 group-hover:ring-primary-400/40"></div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
