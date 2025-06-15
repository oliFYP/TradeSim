import React from 'react';
import { useStockData } from '../../context/StockDataContext';
import { ArrowUpCircle, ArrowDownCircle, History } from 'lucide-react';

const TransactionHistory = () => {
  const { transactions } = useStockData();

  // Format date for display
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md h-full flex flex-col">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-bold text-gray-800 dark:text-white flex items-center">
          <History className="h-5 w-5 mr-2" />
          Transaction History
        </h2>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {transactions.length > 0 ? (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-start">
                    <div className={`mr-3 ${
                      transaction.type === 'buy' 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {transaction.type === 'buy' ? (
                        <ArrowUpCircle className="h-6 w-6" />
                      ) : (
                        <ArrowDownCircle className="h-6 w-6" />
                      )}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800 dark:text-white">
                        {transaction.type === 'buy' ? 'Bought' : 'Sold'} {transaction.symbol}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{transaction.name}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-800 dark:text-white">
                      ${transaction.total.toFixed(2)}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {formatDate(transaction.timestamp)}
                    </div>
                  </div>
                </div>
                
                <div className="mt-2 flex text-sm text-gray-500 dark:text-gray-400">
                  <div className="mr-4">{transaction.shares} shares</div>
                  <div>at ${transaction.price.toFixed(2)}/share</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full px-4 text-center text-gray-500 dark:text-gray-400">
            <History className="h-8 w-8 mb-2 opacity-50" />
            <div className="mb-1">No transaction history</div>
            <div className="text-sm">Your completed trades will appear here</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;