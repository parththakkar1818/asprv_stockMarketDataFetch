import pandas as pd
import yfinance as yf
import matplotlib.pyplot as plt
from datetime import datetime, timedelta
from matplotlib.dates import DateFormatter
import numpy as np
from sklearn.preprocessing import MinMaxScaler

stock_symbol = "VEDL"

end = datetime.now()-timedelta(100)
start = end - timedelta(days=1861)
df = yf.download(stock_symbol+".NS", start, end)
