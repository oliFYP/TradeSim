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
  <div className="py-12 bg-white dark:bg-gray-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-base text-primary-600 font-semibold uppercase">
        Features
      </h2>
      <p className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white">
        Everything you need to learn trading
      </p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map((feature, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="h-12 w-12 bg-primary-500 text-white flex items-center justify-center rounded-md">
              {feature.icon}
            </div>
            <h3 className="mt-5 text-lg font-medium text-gray-900 dark:text-white">
              {feature.title}
            </h3>
            <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default FeaturesSection;
