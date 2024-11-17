import { useState } from "react";

interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  volume: number;
  details: string;
}

const mockStockData: StockData[] = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 172.45,
    change: +1.3,
    volume: 12456800,
    details: "Apple Inc. designs, manufactures, and markets smartphones, tablets, personal computers, and wearables.",
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: 2789.02,
    change: -15.3,
    volume: 7456800,
    details: "Alphabet Inc. is the parent company of Google and specializes in internet services and AI.",
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corp.",
    price: 299.72,
    change: +2.1,
    volume: 5678000,
    details: "Microsoft Corp. develops software, services, and hardware, best known for Windows OS.",
  },
];

export default function HotTakesPage() {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const toggleRow = (symbol: string) => {
    setExpandedRow((prev) => (prev === symbol ? null : symbol));
  };

  return (
    <div className="container">
      <h1>Hot Takes: Stock Market Trends</h1>
      <table className="stock-table">
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Name</th>
            <th>Price</th>
            <th>Change</th>
            <th>Volume</th>
          </tr>
        </thead>
        <tbody>
          {mockStockData.map((stock) => (
            <React.Fragment key={stock.symbol}>
              <tr
                className="stock-row"
                onClick={() => toggleRow(stock.symbol)}
                style={{
                  cursor: "pointer",
                  backgroundColor: expandedRow === stock.symbol ? "#f0f8ff" : "white",
                }}
              >
                <td>{stock.symbol}</td>
                <td>{stock.name}</td>
                <td>${stock.price.toFixed(2)}</td>
                <td
                  style={{
                    color: stock.change > 0 ? "green" : "red",
                  }}
                >
                  {stock.change > 0 ? "+" : ""}
                  {stock.change.toFixed(2)}
                </td>
                <td>{stock.volume.toLocaleString()}</td>
              </tr>
              {expandedRow === stock.symbol && (
                <tr className="stock-details-row">
                  <td colSpan={5} className="details">
                    {stock.details}
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      <style jsx>{`
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        h1 {
          text-align: center;
          margin-bottom: 20px;
        }
        .stock-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }
        .stock-table th,
        .stock-table td {
          padding: 10px;
          border: 1px solid #ddd;
          text-align: center;
        }
        .stock-row:hover {
          background-color: #f9f9f9;
        }
        .stock-details-row .details {
          text-align: left;
          padding: 10px;
          background-color: #f0f8ff;
        }
      `}</style>
    </div>
  );
}
