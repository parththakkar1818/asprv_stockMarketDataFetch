import React, { useState } from 'react';
import { SearchableSelect , GetDataButton } from './SearchBarSelect';
import StockChart from './stockChart';
import LoadingSpinner from './loadingAnimation';
import { StartDate, EndDate, getAgoDate } from "./DateInput";
import StockDataTable from './stockDataTable';
import stockOptions from "./stockList"

const StockDataApp = () => {
  const [selectedStock, setSelectedStock] = useState(null);
  const [startDate, setStartDate] = useState(getAgoDate(1));
  const [endDate, setEndDate] = useState(getAgoDate(0));
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(false);
  

  const handleSelect = (selectedOption) => {
    setSelectedStock(selectedOption);
  };

  const handleGetData = async () => {
    if (selectedStock) {
      try {
        setLoading(true); // Set loading to true before fetching data

        // const response = await fetch("http://localhost:3001/getStockData", {
        const response = await fetch("https://asprv-stock-market-prediction-yb16.vercel.app/getStockData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            stockSymbol: selectedStock.symbol+".NS",
            startDate: startDate,
            endDate: endDate,
          }),
        });
  
        if (response.ok) {
          const data = await response.json();
          const stockSymbol= selectedStock.symbol+".NS";
          const stockData= data.data[stockSymbol];
          setStockData(stockData);
        } else {
          console.error("Failed to fetch stock data");
        }
      } catch (error) {
        console.error("Error fetching stock data:", error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    } else {
      console.log("Please select a stock first.");
    }
  };

  return (
    <div className="relative top-0.5 left-0.5 py-4 px-2 mx-10">
      <div className="flex items-center space-x-4">
        <SearchableSelect options={stockOptions} onSelect={handleSelect} />
        <StartDate value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <EndDate value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        <GetDataButton onClick={handleGetData} />
      </div>
      {loading && <LoadingSpinner />} {/* Display the loading spinner if loading is true */}
      {!loading && stockData && <StockDataTable stockData={stockData} />}
      {!loading && stockData && <StockChart stockData={stockData} />}
    </div>
  );
  
  
};

export default StockDataApp;
