import React, { useEffect, useRef } from 'react';
import { useStockData } from '../../context/StockDataContext';
import { BarChart4, Info } from 'lucide-react';

const timeFrameOptions = ['1D', '5D', '1M', '3M', '1Y'];

const StockChart = () => {
  const { selectedStock, chartData, timeFrame, setTimeFrame } = useStockData();
  const canvasRef = useRef(null);
  
  // Draw chart whenever chart data or timeframe changes
  useEffect(() => {
    if (!canvasRef.current || chartData.length === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Determine if the trend is positive or negative
    const startPrice = chartData[0]?.price || 0;
    const endPrice = chartData[chartData.length - 1]?.price || 0;
    const isPositive = endPrice >= startPrice;
    
    // Set chart colors based on trend
    const lineColor = isPositive ? '#10B981' : '#EF4444';
    const gradientColor = isPositive ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)';
    
    // Set up chart dimensions
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Find min and max values for scaling
    const prices = chartData.map(point => point.price);
    const minPrice = Math.min(...prices) * 0.995; // Add small padding
    const maxPrice = Math.max(...prices) * 1.005;
    const priceRange = maxPrice - minPrice;
    
    // Create gradient for area fill
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, gradientColor);
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    
    // Draw the chart
    if (chartData.length > 1) {
      // Calculate point coordinates
      const points = chartData.map((point, index) => ({
        x: (index / (chartData.length - 1)) * width,
        y: height - ((point.price - minPrice) / priceRange) * height
      }));
      
      // Draw area
      ctx.beginPath();
      ctx.moveTo(points[0].x, height);
      points.forEach(point => {
        ctx.lineTo(point.x, point.y);
      });
      ctx.lineTo(points[points.length - 1].x, height);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Draw line
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      points.forEach(point => {
        ctx.lineTo(point.x, point.y);
      });
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Draw end dot
      ctx.beginPath();
      ctx.arc(points[points.length - 1].x, points[points.length - 1].y, 4, 0, 2 * Math.PI);
      ctx.fillStyle = lineColor;
      ctx.fill();
    }
  }, [chartData, timeFrame, selectedStock]);

  if (!selectedStock) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex items-center justify-center h-full">
        <div className="text-center text-gray-500 dark:text-gray-400">
          Select a stock from your watchlist to view chart
        </div>
      </div>
    );
  }

  // Calculate price change for selected period
  const startPrice = chartData[0]?.price || 0;
  const endPrice = chartData[chartData.length - 1]?.price || 0;
  const priceChange = endPrice - startPrice;
  const priceChangePercent = startPrice !== 0 ? (priceChange / startPrice) * 100 : 0;
  const isPositive = priceChange >= 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 h-full flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center">
            <BarChart4 className="h-5 w-5 mr-2" />
            {selectedStock.symbol}
          </h2>
          <div className="text-sm text-gray-500 dark:text-gray-400">{selectedStock.name}</div>
        </div>
        
        <div className="text-right">
          <div className="text-xl font-bold text-gray-800 dark:text-white">
            ${selectedStock.price.toFixed(2)}
          </div>
          <div className={`flex items-center justify-end text-sm ${
            isPositive
              ? 'text-green-600 dark:text-green-400'
              : 'text-red-600 dark:text-red-400'
          }`}>
            {isPositive ? '+' : ''}{priceChange.toFixed(2)} ({isPositive ? '+' : ''}{priceChangePercent.toFixed(2)}%)
          </div>
        </div>
      </div>
      
      <div className="flex space-x-2 mb-4">
        {timeFrameOptions.map(option => (
          <button
            key={option}
            className={`px-3 py-1 text-xs rounded-md ${
              timeFrame === option
                ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400 font-medium'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
            }`}
            onClick={() => setTimeFrame(option)}
          >
            {option}
          </button>
        ))}
      </div>
      
      <div className="flex-1 relative">
        <canvas 
          ref={canvasRef}
          width={600}
          height={300}
          className="w-full h-full absolute inset-0"
        />
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
          <div className="text-xs text-gray-500 dark:text-gray-400">Open</div>
          <div className="font-medium text-gray-800 dark:text-white">${selectedStock.open?.toFixed(2) || 'N/A'}</div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
          <div className="text-xs text-gray-500 dark:text-gray-400">Volume</div>
          <div className="font-medium text-gray-800 dark:text-white">
            {selectedStock.volume ? (selectedStock.volume / 1000000).toFixed(2) + 'M' : 'N/A'}
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
          <div className="text-xs text-gray-500 dark:text-gray-400">High</div>
          <div className="font-medium text-gray-800 dark:text-white">${selectedStock.high?.toFixed(2) || 'N/A'}</div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
          <div className="text-xs text-gray-500 dark:text-gray-400">Low</div>
          <div className="font-medium text-gray-800 dark:text-white">${selectedStock.low?.toFixed(2) || 'N/A'}</div>
        </div>
      </div>
      
      <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 flex items-center">
        <Info className="h-3 w-3 mr-1" />
        Chart data is simulated for demonstration purposes
      </div>
    </div>
  );
};

export default StockChart;