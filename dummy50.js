//@version=4
strategy("Nifty 50 Call Option Buy Algorithm", overlay = true, initial_capital = 10000, commission_type = strategy.commission.percent, commission_value = 0.1)

// Define the input variables
strike_price = input(title = "Strike Price", type = input.float, defval = 0)
premium = input(title = "Option Premium", type = input.float, defval = 0)

// Define the Nifty 50 index
nifty = security("NSE:NIFTY50", timeframe.period, close)

// Generate the buy signal
buy_signal = nifty > strike_price + premium

// Enter long position if the buy signal is generated
if (buy_signal)
    strategy.entry("Call Buy", strategy.long)

// Exit position if the profit target or stop loss is hit
profit_target = input(title = "Profit Target (%)", type = input.float, defval = 1.0)
stop_loss = input(title = "Stop Loss (%)", type = input.float, defval = 1.0)
strategy.exit("Exit", "Call Buy", limit = nifty * (1 + profit_target / 100), stop = nifty * (1 - stop_loss / 100))


// This script uses the Nifty 50 index to generate a buy signal for a Call option. 
// The strike price and premium are set as input variables, and the buy signal is generated when the Nifty 50 index is greater 
// than the strike price plus the premium. The script enters a long position for the Call option if the buy signal is generated,
// and sets a profit target and stop loss to exit the position. The profit target and stop loss are set as input variables,
// and the exit strategy is defined using the strategy.exit function.
