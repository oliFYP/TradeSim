import React from 'react';
import { useStockData } from '../../context/StockDataContext';
import { useAuth } from '../../context/AuthContext';
import { TrendingUp, TrendingDown, DollarSign, Briefcase } from 'lucide-react';

const Portfolio = () => {
  const { portfolio, stocks } = useStockData();
  const { user } = useAuth();
  
  // Calculate portfolio value and performance
  const calculatePortfolioValue = () => {
    return portfolio.reduce((total, position) => {
      const stock = stocks.find(s => s.symbol === position.symbol);
      const currentPrice = stock ? stock.price : position.currentPrice;
      return total + (position.shares * currentPrice);
    }, 0);
  };
  
  const calculateTotalGainLoss = () => {
    return portfolio.reduce((total, position) => {
      const stock = stocks.find(s => s.symbol === position.symbol);
      const currentPrice = stock ? stock.price : position.currentPrice;
      const positionValue = position.shares * currentPrice;
      const costBasis = position.shares * position.avgPrice;
      return total + (positionValue - costBasis);
    }, 0);
  };
  
  const portfolioValue = calculatePortfolioValue();
  const totalGainLoss = calculateTotalGainLoss();
  const totalGainLossPercent = portfolio.length > 0 
    ? (totalGainLoss / (portfolioValue - totalGainLoss)) * 100
    : 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md h-full flex flex-col">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-bold text-gray-800 dark:text-white flex items-center">
          <Briefcase className="h-5 w-5 mr-2" />
          Portfolio
        </h2>
      </div>
      
      <div className="grid grid-cols-2 gap-4 p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
          <div className="text-sm text-gray-500 dark:text-gray-400">Available Cash</div>
          <div className="text-xl font-bold text-gray-800 dark:text-white mt-1">
            ${user?.funds.toFixed(2)}
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
          <div className="text-sm text-gray-500 dark:text-gray-400">Portfolio Value</div>
          <div className="text-xl font-bold text-gray-800 dark:text-white mt-1">
            ${portfolioValue.toFixed(2)}
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md col-span-2">
          <div className="text-sm text-gray-500 dark:text-gray-400">Total Gain/Loss</div>
          <div className={`text-xl font-bold mt-1 flex items-center ${
            totalGainLoss >= 0 
              ? 'text-green-600 dark:text-green-400' 
              : 'text-red-600 dark:text-red-400'
          }`}>
            {totalGainLoss >= 0 ? (
              <TrendingUp className="h-5 w-5 mr-1" />
            ) : (
              <TrendingDown className="h-5 w-5 mr-1" />
            )}
            ${Math.abs(totalGainLoss).toFixed(2)} ({totalGainLoss >= 0 ? '+' : ''}{totalGainLossPercent.toFixed(2)}%)
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {portfolio.length > 0 ? (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {portfolio.map(position => {
              const stock = stocks.find(s => s.symbol === position.symbol);
              const currentPrice = stock ? stock.price : position.currentPrice;
              const marketValue = position.shares * currentPrice;
              const gainLoss = marketValue - (position.shares * position.avgPrice);
              const gainLossPercent = (gainLoss / (position.shares * position.avgPrice)) * 100;
              
              return (
                <div key={position.symbol} className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold text-gray-800 dark:text-white">{position.symbol}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{position.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-800 dark:text-white">${marketValue.toFixed(2)}</div>
                      <div className={`text-sm ${
                        gainLoss >= 0 
                          ? 'text-green-600 dark:text-green-400' 
                          : 'text-red-600 dark:text-red-400'
                      }`}>
                        {gainLoss >= 0 ? '+' : ''}{gainLoss.toFixed(2)} ({gainLoss >= 0 ? '+' : ''}{gainLossPercent.toFixed(2)}%)
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Shares: </span>
                      <span className="text-gray-800 dark:text-white">{position.shares}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Avg Price: </span>
                      <span className="text-gray-800 dark:text-white">${position.avgPrice.toFixed(2)}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Current: </span>
                      <span className="text-gray-800 dark:text-white">${currentPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full px-4 text-center text-gray-500 dark:text-gray-400">
            <DollarSign className="h-8 w-8 mb-2 opacity-50" />
            <div className="mb-1">Your portfolio is empty</div>
            <div className="text-sm">Start trading to build your portfolio</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;