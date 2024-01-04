const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const yfinance = require("yahoo-finance");
require("dotenv").config(); // Load environment variables from .env file
const apiKey = process.env.ALPHA_VANTAGE_API_KEY;

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
// app.use(cors());
app.use(cors({
  origin: "",
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.get("/", (req, res) => {
  res.send("app is working..");
});

app.post("/getStockData", async (req, res) => {
  try {
    const { stockSymbol, startDate, endDate } = req.body;

    const df = await yfinance.historical({
      symbols: [stockSymbol],
      from: startDate,
      to: endDate,
    });
    res.json({ success: true, data: df });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

app.get("/alpha", (req, res) => {
  "use strict";
  var request = require("request");

  var url =
    "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=ved&apikey=" +
    apiKey;

  var url2 =
    "https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=" +
    apiKey;

  request.get(
    {
      url: url,
      json: true,
      headers: { "User-Agent": "request" },
    },
    (err, response, data) => {
      if (err) {
        console.log("Error:", err);
      } else if (response.statusCode !== 200) {
        console.log("Status:", response.statusCode);
      } else {
        // Check if data and bestMatches are defined
        console.log(data);
        if (data) {
          const nseStocks = data.bestMatches.filter((stock) => {
            return (
              stock["4. region"] === "India/Bombay" &&
              stock["3. type"] === "Equity"
            );
          });

          console.log(nseStocks);
          res.send(nseStocks);
        }
      }
    }
  );
});

app.listen(3001, () => {
  console.log("started on 3001...");
});
