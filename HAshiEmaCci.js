//@version=4
strategy("Heikin-Ashi EMA CCI Trading Algorithm", overlay = true, initial_capital = 10000, commission_type = strategy.commission.percent, commission_value = 0.1)

// Define the Heikin-Ashi candles
hac = heikinashi(close)

// Define the EMA 55 and EMA 200
ema55 = ema(hac, 55)
ema200 = ema(hac, 200)

// Define the CCI
cci_length = input(title = "CCI Length", type = input.integer, defval = 14)
cci = cci(hac, cci_length)

// Generate the buy and sell signals
buy_signal = crossover(ema55, ema200) and cci > 0
sell_signal = crossunder(ema55, ema200) and cci < 0

// Enter long or short position based on the signals
if (buy_signal)
    strategy.entry("Buy", strategy.long)
if (sell_signal)
    strategy.entry("Sell", strategy.short)

// Exit position if the opposite signal is generated
if (buy_signal and strategy.position_size < 0)
strategy.close("Sell")
if (sell_signal and strategy.position_size > 0)
strategy.close("Buy")

// This script uses Heikin-Ashi candles to smooth out the price action, and calculates the EMA 55 and EMA 200 to identify trends.
// It also uses the CCI indicator to identify potential overbought or oversold conditions. When the EMA 55 crosses above the EMA 200 and the CCI is above 0,
// a buy signal is generated. When the EMA 55 crosses below the EMA 200 and the CCI is below 0, a sell signal is generated. The script enters a long or short position based on the signals,
// and exits the position if the opposite signal is generated.
// Again, keep in mind that this is a simplified example and you should do extensive testing and optimization before deploying any Pine Script-based trading algorithm in a live trading setting.
