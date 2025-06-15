import React, { useState } from 'react';
import { useStockData } from '../../context/StockDataContext';
import { PlusCircle, MinusCircle, TrendingUp, TrendingDown, Search } from 'lucide-react';

const Watchlist = () => {
  const { stocks, watchlist, addToWatchlist, removeFromWatchlist, selectStock } = useStockData();
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);

  const watchlistStocks = stocks.filter(stock => watchlist.includes(stock.symbol));
  
  const filteredStocks = stocks.filter(stock => 
    !watchlist.includes(stock.symbol) && (
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) || 
      stock.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setShowResults(e.target.value.length > 0);
  };

  const handleAddStock = (symbol) => {
    addToWatchlist(symbol);
    setSearchTerm('');
    setShowResults(false);
  };

  const handleSelectStock = (stock) => {
    selectStock(stock.symbol);
  };

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-bold text-gray-800 dark:text-white">Watchlist</h2>
        <div className="mt-2 relative">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search stocks..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-colors bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
            />
          </div>
          
          {showResults && filteredStocks.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md shadow-lg max-h-60 overflow-y-auto">
              {filteredStocks.map(stock => (
                <div 
                  key={stock.symbol}
                  className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer flex justify-between items-center"
                  onClick={() => handleAddStock(stock.symbol)}
                >
                  <div>
                    <div className="font-medium text-gray-800 dark:text-white">{stock.symbol}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{stock.name}</div>
                  </div>
                  <PlusCircle className="h-5 w-5 text-primary-500" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {watchlistStocks.length > 0 ? (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {watchlistStocks.map(stock => (
              <div 
                key={stock.symbol}
                className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                onClick={() => handleSelectStock(stock)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold text-gray-800 dark:text-white">{stock.symbol}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{stock.name}</div>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromWatchlist(stock.symbol);
                    }}
                    className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                  >
                    <MinusCircle className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="mt-2 flex justify-between items-end">
                  <div className="text-lg font-bold text-gray-800 dark:text-white">
                    ${stock.price.toFixed(2)}
                  </div>
                  <div className={`flex items-center text-sm ${
                    stock.change >= 0 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {stock.change >= 0 ? (
                      <TrendingUp className="h-4 w-4 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 mr-1" />
                    )}
                    <span>{stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}</span>
                    <span className="ml-1">({stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full px-4 text-center text-gray-500 dark:text-gray-400">
            <div className="mb-2">Your watchlist is empty</div>
            <div className="text-sm">Search for stocks above to add them to your watchlist</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Watchlist;