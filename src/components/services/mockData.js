export const mockStocks = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 185.92,
    change: 2.37,
    changePercent: 1.29,
    open: 183.55,
    high: 186.21,
    low: 183.12,
    volume: 48572600,
    marketCap: 2910000000000
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    price: 410.34,
    change: 3.15,
    changePercent: 0.77,
    open: 407.19,
    high: 411.56,
    low: 406.85,
    volume: 18765400,
    marketCap: 3050000000000
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    price: 152.87,
    change: -0.56,
    changePercent: -0.37,
    open: 153.43,
    high: 154.21,
    low: 152.33,
    volume: 21654300,
    marketCap: 1930000000000
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    price: 178.12,
    change: 1.23,
    changePercent: 0.70,
    open: 176.89,
    high: 178.45,
    low: 176.21,
    volume: 32456700,
    marketCap: 1840000000000
  },
  {
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    price: 176.75,
    change: -3.42,
    changePercent: -1.90,
    open: 180.17,
    high: 181.35,
    low: 175.88,
    volume: 87654300,
    marketCap: 562000000000
  },
  {
    symbol: 'META',
    name: 'Meta Platforms, Inc.',
    price: 472.18,
    change: 5.32,
    changePercent: 1.14,
    open: 466.86,
    high: 473.45,
    low: 466.12,
    volume: 15678900,
    marketCap: 1210000000000
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    price: 926.76,
    change: 12.54,
    changePercent: 1.37,
    open: 914.22,
    high: 928.33,
    low: 913.56,
    volume: 35246700,
    marketCap: 2280000000000
  },
  {
    symbol: 'JPM',
    name: 'JPMorgan Chase & Co.',
    price: 196.42,
    change: -0.87,
    changePercent: -0.44,
    open: 197.29,
    high: 198.12,
    low: 195.78,
    volume: 9876500,
    marketCap: 568000000000
  }
];

export const generateChartData = (timeFrame) => {
  const now = new Date();
  const data = [];
  let dataPoints = 0;
  let interval = 0;
  let startPrice = 100;
  let volatility = 0;
  
  switch (timeFrame) {
    case '1D':
      dataPoints = 78; // 6.5 hours (market hours) with 5-minute intervals
      interval = 5 * 60 * 1000; // 5 minutes in milliseconds
      volatility = 0.05;
      break;
    case '5D':
      dataPoints = 39 * 5; // 5 days with 10-minute intervals
      interval = 10 * 60 * 1000; // 10 minutes in milliseconds
      volatility = 0.1;
      break;
    case '1M':
      dataPoints = 23; // ~23 trading days in a month (daily intervals)
      interval = 24 * 60 * 60 * 1000; // 1 day in milliseconds
      volatility = 0.5;
      break;
    case '3M':
      dataPoints = 65; // ~65 trading days in 3 months (daily intervals)
      interval = 24 * 60 * 60 * 1000; // 1 day in milliseconds
      volatility = 1;
      break;
    case '1Y':
      dataPoints = 52; // 52 weeks (weekly intervals)
      interval = 7 * 24 * 60 * 60 * 1000; // 1 week in milliseconds
      volatility = 2;
      break;
  }

  let currentPrice = startPrice;
  for (let i = dataPoints - 1; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - (i * interval)).toISOString();
    
    // Random price change with trend
    const change = (Math.random() - 0.48) * volatility; // Slight upward bias
    currentPrice = Math.max(currentPrice * (1 + change), 0.01);
    
    data.push({
      timestamp,
      price: parseFloat(currentPrice.toFixed(2))
    });
  }
  
  return data;
};