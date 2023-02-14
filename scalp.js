//@version=4
strategy("Scalping Strategy", overlay=true, initial_capital=10000, commission_type=strategy.commission.percent, commission_value=0.1)

// Define the indicators and input variables
fast_ma = input(title="Fast Moving Average Length", type=input.integer, defval=5)
slow_ma = input(title="Slow Moving Average Length", type=input.integer, defval=20)
bb_length = input(title="Bollinger Bands Length", type=input.integer, defval=20)
bb_mult = input(title="Bollinger Bands Standard Deviation", type=input.float, defval=2.0)
rsi_length = input(title="RSI Length", type=input.integer, defval=14)
buy_signal = 0
sell_signal = 0

// Define the moving averages
fast = sma(close, fast_ma)
slow = sma(close, slow_ma)

// Define the Bollinger Bands
bb_mid = sma(close, bb_length)
bb_upper = bb_mid + bb_mult * stdev(close, bb_length)
bb_lower = bb_mid - bb_mult * stdev(close, bb_length)

// Define the RSI
rsi = rsi(close, rsi_length)

// Generate the buy and sell signals
if (crossover(fast, slow) and close > bb_upper and rsi < 30)
    buy_signal := 1
if (crossunder(fast, slow) and close < bb_lower and rsi > 70)
    sell_signal := 1

// Enter long or short position based on the signals
if (buy_signal == 1)
    strategy.entry("Buy", strategy.long)
if (sell_signal == 1)
    strategy.entry("Sell", strategy.short)

// Exit position if the opposite signal is generated
if (buy_signal == 1 and strategy.position_size < 0)
    strategy.close("Sell")
if (sell_signal == 1 and strategy.position_size > 0)
    strategy.close("Buy")


// This script uses a combination of a fast and slow moving average, Bollinger Bands, and the RSI to generate buy and sell signals. 
// When the fast MA crosses above the slow MA and the price is above the upper Bollinger Band while the RSI is below 30, a buy signal is generated. 
// When the fast MA crosses below the slow MA and the price is below the lower Bollinger Band while the RSI is above 70, a sell signal is generated.
// The script enters a long or short position based on the signals, and exits the position if the opposite signal is generated. 
