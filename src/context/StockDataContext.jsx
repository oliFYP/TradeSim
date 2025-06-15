import { createContext, useContext, useState, useEffect } from "react";
import { mockStocks, generateChartData } from "../components/services/mockData";

const StockDataContext = createContext();

export const useStockData = () => {
  const context = useContext(StockDataContext);
  if (!context) {
    throw new Error("useStockData must be used within a StockDataProvider");
  }
  return context;
};

export const StockDataProvider = ({ children }) => {
  const [stocks, setStocks] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [watchlist, setWatchlist] = useState([
    "AAPL",
    "MSFT",
    "GOOGL",
    "AMZN",
    "TSLA",
  ]);
  const [chartData, setChartData] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [timeFrame, setTimeFrame] = useState("1D");
  const [isLoading, setIsLoading] = useState(true);

  // Load initial data
  useEffect(() => {
    const loadInitialData = () => {
      setIsLoading(true);

      // Load stocks
      setStocks(mockStocks);

      // Load portfolio from localStorage
      const storedPortfolio = localStorage.getItem("portfolio");
      if (storedPortfolio) {
        setPortfolio(JSON.parse(storedPortfolio));
      }

      // Load transactions from localStorage
      const storedTransactions = localStorage.getItem("transactions");
      if (storedTransactions) {
        setTransactions(JSON.parse(storedTransactions));
      }

      // Load watchlist from localStorage
      const storedWatchlist = localStorage.getItem("watchlist");
      if (storedWatchlist) {
        setWatchlist(JSON.parse(storedWatchlist));
      }

      // Set default selected stock
      setSelectedStock(mockStocks[0]);

      // Generate initial chart data
      setChartData(generateChartData("1D"));

      setIsLoading(false);
    };

    loadInitialData();

    // Simulate price updates
    const interval = setInterval(() => {
      setStocks((prevStocks) =>
        prevStocks.map((stock) => {
          const changePercent = (Math.random() * 2 - 1) * 0.5; // Random change between -0.5% and +0.5%
          const change = stock.price * (changePercent / 100);
          const newPrice = Math.max(stock.price + change, 0.01); // Ensure price doesn't go negative

          return {
            ...stock,
            price: parseFloat(newPrice.toFixed(2)),
            change: parseFloat(change.toFixed(2)),
            changePercent: parseFloat(changePercent.toFixed(2)),
          };
        })
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Update chart data when timeframe changes
  useEffect(() => {
    setChartData(generateChartData(timeFrame));
  }, [timeFrame]);

  // Persist portfolio and transactions
  useEffect(() => {
    if (portfolio.length > 0) {
      localStorage.setItem("portfolio", JSON.stringify(portfolio));
    }
  }, [portfolio]);

  useEffect(() => {
    if (transactions.length > 0) {
      localStorage.setItem("transactions", JSON.stringify(transactions));
    }
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  const addToWatchlist = (symbol) => {
    if (!watchlist.includes(symbol)) {
      setWatchlist([...watchlist, symbol]);
    }
  };

  const removeFromWatchlist = (symbol) => {
    setWatchlist(watchlist.filter((s) => s !== symbol));
  };

  const selectStock = (symbol) => {
    const stock = stocks.find((s) => s.symbol === symbol);
    if (stock) {
      setSelectedStock(stock);
      setChartData(generateChartData(timeFrame));
    }
  };

  const executeOrder = (type, symbol, shares, price) => {
    const stock = stocks.find((s) => s.symbol === symbol);
    if (!stock) return false;

    const total = shares * price;
    const transaction = {
      id: Date.now().toString(),
      symbol,
      name: stock.name,
      type,
      shares,
      price,
      total,
      timestamp: new Date().toISOString(),
    };

    // Update portfolio
    const existingPosition = portfolio.find((p) => p.symbol === symbol);

    if (type === "buy") {
      if (existingPosition) {
        // Update existing position
        const newShares = existingPosition.shares + shares;
        const newAvgPrice =
          (existingPosition.shares * existingPosition.avgPrice + total) /
          newShares;

        setPortfolio(
          portfolio.map((p) =>
            p.symbol === symbol
              ? {
                  ...p,
                  shares: newShares,
                  avgPrice: parseFloat(newAvgPrice.toFixed(2)),
                  currentPrice: price,
                }
              : p
          )
        );
      } else {
        // Add new position
        setPortfolio([
          ...portfolio,
          {
            symbol,
            name: stock.name,
            shares,
            avgPrice: price,
            currentPrice: price,
          },
        ]);
      }
    } else if (type === "sell") {
      if (!existingPosition || existingPosition.shares < shares) {
        return false; // Cannot sell more than owned
      }

      if (existingPosition.shares === shares) {
        // Remove position entirely
        setPortfolio(portfolio.filter((p) => p.symbol !== symbol));
      } else {
        // Reduce position
        setPortfolio(
          portfolio.map((p) =>
            p.symbol === symbol
              ? { ...p, shares: p.shares - shares, currentPrice: price }
              : p
          )
        );
      }
    }

    // Add transaction to history
    setTransactions([transaction, ...transactions]);

    return true;
  };

  return (
    <StockDataContext.Provider
      value={{
        stocks,
        portfolio,
        transactions,
        watchlist,
        chartData,
        selectedStock,
        timeFrame,
        isLoading,
        addToWatchlist,
        removeFromWatchlist,
        selectStock,
        setTimeFrame,
        executeOrder,
      }}
    >
      {children}
    </StockDataContext.Provider>
  );
};
