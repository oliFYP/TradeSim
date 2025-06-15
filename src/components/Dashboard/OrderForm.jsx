import React, { useState, useEffect } from 'react';
import { useStockData } from '../../context/StockDataContext';
import { useAuth } from '../../context/AuthContext';
import { ArrowUpSquare, ArrowDownSquare, DollarSign, Hash } from 'lucide-react';

const OrderForm = () => {
  const { selectedStock, executeOrder } = useStockData();
  const { user } = useAuth();
  
  const [orderType, setOrderType] = useState('buy');
  const [shares, setShares] = useState(1);
  const [price, setPrice] = useState(0);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (selectedStock) {
      setPrice(selectedStock.price);
      calculateTotal(shares, selectedStock.price);
    }
  }, [selectedStock]);

  const calculateTotal = (shareCount, sharePrice) => {
    setTotal(shareCount * sharePrice);
  };

  const handleSharesChange = (e) => {
    const value = parseInt(e.target.value);
    if (isNaN(value) || value <= 0) {
      setShares(1);
      calculateTotal(1, price);
    } else {
      setShares(value);
      calculateTotal(value, price);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!selectedStock) {
      setError('Please select a stock first');
      return;
    }
    
    if (shares <= 0) {
      setError('Please enter a valid number of shares');
      return;
    }
    
    // Check if user has enough funds for buying
    if (orderType === 'buy' && user && total > user.funds) {
      setError('Insufficient funds to complete this order');
      return;
    }
    
    const success = executeOrder(orderType, selectedStock.symbol, shares, price);
    
    if (success) {
      setSuccess(`${orderType === 'buy' ? 'Bought' : 'Sold'} ${shares} shares of ${selectedStock.symbol} at $${price.toFixed(2)}`);
      setShares(1);
    } else {
      setError('Failed to execute order. Please try again.');
    }
  };

  if (!selectedStock) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex items-center justify-center h-full">
        <div className="text-center text-gray-500 dark:text-gray-400">
          Select a stock from your watchlist to trade
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Place Order</h2>
      
      <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-lg font-bold text-gray-800 dark:text-white">{selectedStock.symbol}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{selectedStock.name}</div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-gray-800 dark:text-white">${selectedStock.price.toFixed(2)}</div>
            <div className={`text-sm ${
              selectedStock.change >= 0 
                ? 'text-green-600 dark:text-green-400' 
                : 'text-red-600 dark:text-red-400'
            }`}>
              {selectedStock.change >= 0 ? '+' : ''}{selectedStock.change.toFixed(2)} ({selectedStock.change >= 0 ? '+' : ''}{selectedStock.changePercent.toFixed(2)}%)
            </div>
          </div>
        </div>
      </div>
      
      {error && (
        <div className="p-3 mb-4 text-sm border rounded text-red-500 border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800">
          {error}
        </div>
      )}
      
      {success && (
        <div className="p-3 mb-4 text-sm border rounded text-green-500 border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800">
          {success}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <div className="grid grid-cols-2 gap-2 mb-4">
            <button
              type="button"
              className={`flex items-center justify-center py-2 px-4 rounded-md ${
                orderType === 'buy'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
              }`}
              onClick={() => setOrderType('buy')}
            >
              <ArrowUpSquare className="h-5 w-5 mr-2" />
              Buy
            </button>
            <button
              type="button"
              className={`flex items-center justify-center py-2 px-4 rounded-md ${
                orderType === 'sell'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
              }`}
              onClick={() => setOrderType('sell')}
            >
              <ArrowDownSquare className="h-5 w-5 mr-2" />
              Sell
            </button>
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Shares
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Hash className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="number"
              className="pl-10 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary-300 focus:border-primary-300 transition-colors bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              min="1"
              value={shares}
              onChange={handleSharesChange}
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Price per Share
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <DollarSign className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="pl-10 w-full px-4 py-2 border rounded-md bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-300"
              value={`$${price.toFixed(2)}`}
              disabled
            />
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Using market price for this simulation
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Total
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <DollarSign className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="pl-10 w-full px-4 py-2 border rounded-md bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-300 font-bold"
              value={`$${total.toFixed(2)}`}
              disabled
            />
          </div>
        </div>
        
        <button
          type="submit"
          className={`w-full py-2 px-4 rounded-md text-white ${
            orderType === 'buy'
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-red-600 hover:bg-red-700'
          } transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            orderType === 'buy' ? 'focus:ring-green-500' : 'focus:ring-red-500'
          }`}
        >
          {orderType === 'buy' ? 'Buy' : 'Sell'} {shares} Share{shares !== 1 ? 's' : ''} of {selectedStock.symbol}
        </button>
      </form>
    </div>
  );
};

export default OrderForm;