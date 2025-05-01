import React, { useEffect, useState } from "react";

const symbols = ["AAPL", "GOOGL", "AMZN", "MSFT", "TSLA", "NVDA"];
const API_KEY = "d09o5chr01qus8recl70d09o5chr01qus8recl7g"; // Replace with your real key

const TickerTape = () => {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const data = await Promise.all(
          symbols.map(async (symbol) => {
            const res = await fetch(
              `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`
            );
            const json = await res.json();
            return {
              symbol,
              price: json.c,
              change: json.d,
              percent: json.dp,
            };
          })
        );
        setQuotes(data);
      } catch (err) {
        console.error("Error fetching quotes:", err);
      }
    };

    fetchQuotes();
    const interval = setInterval(fetchQuotes, 10000); // refresh every 10s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-hidden bg-gray-900 text-white whitespace-nowrap w-full">
      <div className="animate-marquee flex gap-10 py-1">
        {" "}
        {/* Reduced the padding here */}
        {quotes.map(({ symbol, price, change, percent }) => (
          <div
            key={symbol}
            className="flex items-center gap-2 px-4 py-1 rounded-md"
          >
            <span className="font-bold">{symbol}</span>
            <span>${price?.toFixed(2)}</span>
            <span
              className={`${change >= 0 ? "text-green-400" : "text-red-400"}`}
            >
              ({change?.toFixed(2)} / {percent?.toFixed(2)}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TickerTape;
