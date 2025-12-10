# Gold Trading Strategies Archive

## Overview

This document catalogs proven trading strategies for spot gold (XAU/USD) markets, categorized by trading style, timeframe, and complexity. Each strategy includes entry/exit rules, risk management, and tool requirements.

---

## Table of Contents

1. [Day Trading Strategies](#day-trading-strategies)
2. [Swing Trading Strategies](#swing-trading-strategies)
3. [Position Trading Strategies](#position-trading-strategies)
4. [Scalping Strategies](#scalping-strategies)
5. [Hedging Strategies](#hedging-strategies)
6. [Algorithm-Based Strategies](#algorithm-based-strategies)
7. [Fundamental Analysis Strategies](#fundamental-analysis-strategies)
8. [Tools Required Per Strategy](#tools-required-per-strategy)

---

## Day Trading Strategies

### 1. Opening Range Breakout (ORB)

**Timeframe:** 5-15 minutes
**Session:** London & New York open
**Difficulty:** Intermediate

**Strategy:**
1. Mark the high/low of first 30 minutes after market open
2. Buy on breakout above opening range high
3. Sell on breakout below opening range low
4. Place stop loss at opposite end of range

**Entry Rules:**
- Price closes above/below opening range
- Volume increases on breakout
- Confirm with 5-minute candle close

**Exit Rules:**
- Target: 1.5x to 2x opening range height
- Stop loss: Beyond opening range boundary
- Time stop: Exit all positions before session end

**Tools Needed:**
- ✅ Real-time price chart (5-min, 15-min)
- ✅ Volume indicators
- ✅ Price alerts at range boundaries
- ✅ Session markers (London/NY open)
- ✅ Position calculator for lot sizing

---

### 2. Pivot Point Trading

**Timeframe:** 15-30 minutes
**Session:** Any major session
**Difficulty:** Beginner

**Strategy:**
1. Calculate daily pivot points (PP, R1, R2, S1, S2)
2. Buy at support levels (S1, S2)
3. Sell at resistance levels (R1, R2)
4. Use pivot point as dynamic stop/target

**Entry Rules:**
- Price touches S1/S2 with bullish reversal pattern
- Price touches R1/R2 with bearish reversal pattern
- RSI confirms oversold/overbought

**Exit Rules:**
- Target: Next pivot level
- Stop loss: 10-15 pips beyond entry pivot
- Break-even stop after 50% target reached

**Tools Needed:**
- ✅ Pivot point calculator
- ✅ Support/resistance drawing tools
- ✅ RSI indicator (14-period)
- ✅ Price alerts at pivot levels
- ✅ Candlestick pattern recognition

---

### 3. Moving Average Crossover (Day)

**Timeframe:** 15-30 minutes
**Session:** London & New York
**Difficulty:** Beginner

**Strategy:**
1. Use 20 EMA and 50 EMA
2. Buy when 20 EMA crosses above 50 EMA
3. Sell when 20 EMA crosses below 50 EMA
4. Confirm with price action

**Entry Rules:**
- EMA crossover confirmed by candle close
- Price is above/below both EMAs
- No major news events scheduled

**Exit Rules:**
- Opposite crossover signal
- Fixed take profit: 20-30 pips
- Stop loss: 15 pips or recent swing low/high

**Tools Needed:**
- ✅ EMA indicators (20, 50)
- ✅ Crossover alerts
- ✅ Economic calendar (avoid news)
- ✅ Price action patterns

---

## Swing Trading Strategies

### 4. Trend Following (Multi-Day)

**Timeframe:** 4-hour, Daily
**Hold Period:** 3-10 days
**Difficulty:** Intermediate

**Strategy:**
1. Identify trend using 200-day SMA
2. Enter on pullbacks to 20-day EMA
3. Hold until trend reversal signal
4. Use trailing stop to protect profits

**Entry Rules:**
- Price above 200 SMA (uptrend) or below (downtrend)
- Price pulls back to 20 EMA
- RSI between 40-60 (not overbought/oversold)
- Enter on bounce from 20 EMA

**Exit Rules:**
- Price closes below 20 EMA (uptrend) or above (downtrend)
- Trailing stop: 2x ATR
- Target: Major resistance/support level

**Tools Needed:**
- ✅ SMA (200-day), EMA (20-day)
- ✅ RSI (14-period)
- ✅ ATR for stop placement
- ✅ Support/resistance levels
- ✅ Multi-timeframe analysis
- ✅ Email alerts for signals

---

### 5. Fibonacci Retracement Trading

**Timeframe:** 1-hour, 4-hour
**Hold Period:** 2-7 days
**Difficulty:** Intermediate

**Strategy:**
1. Identify significant trend move
2. Draw Fibonacci retracement (0%, 23.6%, 38.2%, 50%, 61.8%, 100%)
3. Buy at 38.2% or 50% retracement in uptrend
4. Sell at 38.2% or 50% retracement in downtrend

**Entry Rules:**
- Clear trend established (20+ pip move)
- Price retraces to Fibonacci level
- Bullish/bearish reversal pattern at level
- Volume decreases on retracement

**Exit Rules:**
- Target: Previous high/low (100% extension)
- Stop loss: Beyond next Fibonacci level
- Partial profit at 61.8% of move

**Tools Needed:**
- ✅ Fibonacci retracement drawing tool
- ✅ Fibonacci extension tool
- ✅ Candlestick pattern recognition
- ✅ Volume analysis
- ✅ Trendline drawing

---

### 6. Bollinger Band Squeeze

**Timeframe:** 4-hour, Daily
**Hold Period:** 3-7 days
**Difficulty:** Advanced

**Strategy:**
1. Identify low volatility (Bollinger Bands narrow)
2. Wait for breakout from bands
3. Enter in direction of breakout
4. Ride volatility expansion

**Entry Rules:**
- Bollinger Band width at 6-month low
- Price breaks above upper band (buy) or below lower band (sell)
- Volume surge on breakout
- Confirm with ATR expansion

**Exit Rules:**
- Opposite band reached
- Bollinger Bands widen to extreme levels
- Price closes back inside bands

**Tools Needed:**
- ✅ Bollinger Bands (20, 2)
- ✅ Bollinger Band width indicator
- ✅ ATR indicator
- ✅ Volume analysis
- ✅ Volatility alerts

---

## Position Trading Strategies

### 7. Macro Economic Trend Following

**Timeframe:** Weekly, Monthly
**Hold Period:** 1-6 months
**Difficulty:** Advanced

**Strategy:**
1. Analyze macro factors (inflation, interest rates, USD strength)
2. Position based on long-term economic outlook
3. Add to position on pullbacks
4. Hold through short-term volatility

**Entry Rules:**
- Clear macro trend identified (rising inflation → gold up)
- Price confirmation on weekly chart
- Enter on monthly support level
- Dollar-cost average over multiple weeks

**Exit Rules:**
- Macro trend reversal (Fed policy change)
- Major support/resistance break on monthly chart
- Trailing stop: 10% from peak

**Tools Needed:**
- ✅ Economic calendar with Fed meetings
- ✅ Inflation data (CPI, PPI)
- ✅ USD Index correlation chart
- ✅ Long-term trend analysis (weekly/monthly)
- ✅ Position sizing calculator
- ✅ News feed for policy changes

---

### 8. Seasonal Trading

**Timeframe:** Monthly
**Hold Period:** 1-3 months
**Difficulty:** Intermediate

**Strategy:**
1. Identify seasonal patterns (gold often rises Aug-Feb)
2. Enter positions during historically strong months
3. Exit during weak seasonal periods
4. Combine with technical confirmation

**Entry Rules:**
- Entering strong seasonal period
- Price above 50-week MA
- No major bearish divergences

**Exit Rules:**
- End of strong seasonal period
- Price breaks below 50-week MA
- Take profit: 10-15% gain

**Tools Needed:**
- ✅ Seasonality chart/analyzer
- ✅ Historical price data (10+ years)
- ✅ Moving averages (50-week, 200-week)
- ✅ Monthly performance heatmap

---

## Scalping Strategies

### 9. 1-Minute Momentum Scalping

**Timeframe:** 1-minute
**Session:** London or NY open
**Difficulty:** Advanced

**Strategy:**
1. Trade only during high volatility periods
2. Enter on strong momentum candles
3. Quick in-and-out (30 seconds to 3 minutes)
4. 5-10 pip targets, 3-5 pip stops

**Entry Rules:**
- Large 1-minute candle (2x average size)
- Volume spike
- Price breaking short-term resistance/support
- RSI shows momentum (>70 or <30)

**Exit Rules:**
- Fixed target: 5-10 pips
- Fixed stop: 3-5 pips
- Time stop: Exit if no movement in 3 minutes
- Risk:Reward minimum 1:1.5

**Tools Needed:**
- ✅ 1-minute candlestick chart
- ✅ Real-time tick data
- ✅ Volume indicator
- ✅ RSI (7-period)
- ✅ One-click trading
- ✅ Low latency price feed

---

### 10. News Event Scalping

**Timeframe:** 1-5 minutes
**Session:** Around major news releases
**Difficulty:** Expert

**Strategy:**
1. Trade immediately after high-impact news (NFP, CPI, Fed)
2. Enter in direction of initial spike
3. Ride momentum for quick profit
4. Exit before retracement

**Entry Rules:**
- High-impact news just released
- Price moves >10 pips in first 30 seconds
- Enter in spike direction
- Volume confirmation

**Exit Rules:**
- Target: 15-20 pips
- Stop loss: 10 pips
- Exit within 2-5 minutes
- Never hold through next news event

**Tools Needed:**
- ✅ Economic calendar with real-time updates
- ✅ News feed with instant alerts
- ✅ 1-minute chart
- ✅ Volatility spike alerts
- ✅ Fast execution platform

---

## Hedging Strategies

### 11. Long Gold / Short Dollar Index

**Timeframe:** Daily, Weekly
**Hold Period:** 1-3 months
**Difficulty:** Advanced

**Strategy:**
1. Gold and USD typically inverse correlation
2. Long gold when USD weakening
3. Short USD Index (DXY) or long EUR/USD
4. Hedge portfolio against USD risk

**Entry Rules:**
- Gold breaking above resistance
- USD Index breaking below support
- Negative correlation confirmed (> -0.7)
- Both positions entered simultaneously

**Exit Rules:**
- Correlation breaks down
- Either position hits stop loss
- Target: 10% gain on combined position

**Tools Needed:**
- ✅ Correlation matrix (Gold vs DXY)
- ✅ Multi-asset charting
- ✅ Portfolio tracking
- ✅ Risk management calculator

---

### 12. Gold Mining Stocks Arbitrage

**Timeframe:** Daily
**Hold Period:** 1-4 weeks
**Difficulty:** Advanced

**Strategy:**
1. Monitor gold miners vs spot gold spread
2. Long miners / Short gold when spread wide
3. Short miners / Long gold when spread narrow
4. Profit from spread normalization

**Entry Rules:**
- GDX/Gold ratio at historical extremes
- Miners underperforming gold by >10%
- Technical setup confirms entry

**Exit Rules:**
- Spread returns to historical average
- Stop loss: 5% on combined position
- Time stop: 1 month

**Tools Needed:**
- ✅ GDX/GLD ratio chart
- ✅ Mining stock correlation analysis
- ✅ Historical ratio data
- ✅ Multi-asset tracking

---

## Algorithm-Based Strategies

### 13. Mean Reversion Algorithm

**Timeframe:** 5-minute to 1-hour
**Hold Period:** Minutes to hours
**Difficulty:** Expert

**Strategy:**
1. Identify gold's daily average price
2. Enter when price deviates >2 standard deviations
3. Exit when price returns to mean
4. Automated execution

**Entry Rules:**
```python
if price > (daily_average + 2 * std_dev):
    sell()
elif price < (daily_average - 2 * std_dev):
    buy()
```

**Exit Rules:**
- Price returns to daily average
- Opposite signal triggered
- Maximum hold: 4 hours

**Tools Needed:**
- ✅ Backtesting engine
- ✅ Standard deviation calculator
- ✅ Automated trading API
- ✅ Historical data (tick/minute level)

---

### 14. Machine Learning Prediction

**Timeframe:** 1-hour to Daily
**Hold Period:** 1-24 hours
**Difficulty:** Expert

**Strategy:**
1. Train ML model on historical patterns
2. Model predicts next move direction
3. Enter when confidence >70%
4. Adjust position size based on confidence

**Features Used:**
- Price action (OHLC)
- Technical indicators (RSI, MACD, MA)
- Volume
- News sentiment score
- Correlation with USD, stocks
- Time of day, day of week

**Tools Needed:**
- ✅ ML prediction engine
- ✅ Feature engineering pipeline
- ✅ Sentiment analysis tool
- ✅ Backtesting with walk-forward validation
- ✅ Real-time data feed

---

## Fundamental Analysis Strategies

### 15. Central Bank Policy Trading

**Timeframe:** Weekly, Monthly
**Hold Period:** 1-6 months
**Difficulty:** Advanced

**Strategy:**
1. Monitor Fed rate decisions and forward guidance
2. Buy gold when Fed turns dovish (rate cuts, QE)
3. Sell gold when Fed turns hawkish (rate hikes)
4. Position ahead of policy shifts

**Entry Rules:**
- Fed signals rate cut or pauses hikes
- Real interest rates turning negative
- Inflation rising while rates held steady
- Technical confirmation on weekly chart

**Exit Rules:**
- Fed signals rate hike cycle beginning
- Real interest rates turning positive
- Inflation peaking

**Tools Needed:**
- ✅ Economic calendar (Fed meetings)
- ✅ Interest rate tracker
- ✅ Real rate calculator (nominal - inflation)
- ✅ Fed funds futures
- ✅ News alerts for Fed speeches

---

### 16. Geopolitical Crisis Trading

**Timeframe:** Daily
**Hold Period:** Days to weeks
**Difficulty:** Intermediate

**Strategy:**
1. Monitor geopolitical tensions
2. Buy gold on crisis escalation (safe haven demand)
3. Sell on crisis resolution
4. Quick reaction to breaking news

**Entry Rules:**
- Major geopolitical event (war, sanctions, etc.)
- Gold gaps up or spikes on news
- Enter on first pullback after spike
- Confirmed by VIX spike

**Exit Rules:**
- Crisis de-escalates
- Gold returns to pre-crisis level
- Trailing stop: 5% from peak

**Tools Needed:**
- ✅ Real-time news feed
- ✅ Breaking news alerts
- ✅ VIX correlation indicator
- ✅ Geopolitical event calendar

---

## Tools Required Per Strategy

### Strategy Tool Matrix

| Strategy | Chart | Alerts | Calendar | Portfolio | Backtest | Calc | News | Sentiment |
|----------|-------|--------|----------|-----------|----------|------|------|-----------|
| Opening Range Breakout | ✅ | ✅ | ⚠️ | ✅ | ⚠️ | ✅ | ❌ | ❌ |
| Pivot Points | ✅ | ✅ | ⚠️ | ✅ | ❌ | ✅ | ❌ | ❌ |
| MA Crossover | ✅ | ✅ | ✅ | ⚠️ | ✅ | ⚠️ | ❌ | ❌ |
| Trend Following | ✅ | ✅ | ⚠️ | ✅ | ✅ | ✅ | ⚠️ | ❌ |
| Fibonacci | ✅ | ✅ | ❌ | ⚠️ | ✅ | ⚠️ | ❌ | ❌ |
| Bollinger Squeeze | ✅ | ✅ | ❌ | ⚠️ | ✅ | ⚠️ | ❌ | ❌ |
| Macro Trend | ✅ | ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ |
| Seasonal | ✅ | ❌ | ⚠️ | ✅ | ✅ | ⚠️ | ❌ | ❌ |
| 1-Min Scalping | ✅ | ✅ | ✅ | ⚠️ | ⚠️ | ✅ | ❌ | ❌ |
| News Scalping | ✅ | ✅ | ✅ | ⚠️ | ❌ | ✅ | ✅ | ⚠️ |
| Gold/USD Hedge | ✅ | ⚠️ | ⚠️ | ✅ | ✅ | ✅ | ⚠️ | ❌ |
| Mining Arbitrage | ✅ | ⚠️ | ⚠️ | ✅ | ✅ | ⚠️ | ❌ | ❌ |
| Mean Reversion | ✅ | ✅ | ❌ | ⚠️ | ✅ | ✅ | ❌ | ❌ |
| ML Prediction | ✅ | ✅ | ⚠️ | ⚠️ | ✅ | ✅ | ⚠️ | ✅ |
| Central Bank | ✅ | ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ |
| Geopolitical | ✅ | ✅ | ⚠️ | ✅ | ⚠️ | ⚠️ | ✅ | ✅ |

**Legend:**
- ✅ Essential - Strategy cannot work without this
- ⚠️ Helpful - Improves strategy effectiveness
- ❌ Not needed - Not relevant to this strategy

---

## Risk Management Rules (Universal)

### Position Sizing
```
Risk per trade = 1-2% of account balance
Position size = (Account Balance * Risk%) / Stop Loss Distance
```

### Stop Loss Guidelines
- **Day Trading:** 10-20 pips or 1x ATR
- **Swing Trading:** 30-50 pips or 2x ATR
- **Position Trading:** 100+ pips or 3x ATR
- **Scalping:** 3-10 pips fixed

### Take Profit Targets
- Minimum Risk:Reward = 1:1.5
- Partial profit at 1:1, let rest run to 1:2 or 1:3
- Trail stop to breakeven after 50% target reached

### Maximum Exposure
- Never risk more than 5% total account on all open positions
- Maximum 3 correlated positions at once
- Daily loss limit: 2-3% of account

---

## Backtesting Requirements

### Data Needed
- Historical OHLC data (tick, 1-min, 5-min, 1H, 1D)
- Volume data
- Spread data (bid-ask)
- Economic event dates and times
- News headlines with timestamps

### Metrics to Track
- Total return
- Sharpe ratio
- Maximum drawdown
- Win rate
- Average win/loss
- Profit factor
- Number of trades
- Average holding period

### Walk-Forward Validation
- Train on 70% of data
- Test on 30% out-of-sample
- Re-optimize quarterly
- Compare in-sample vs out-of-sample performance

---

## Tool Gaps Analysis

### Missing Tools (To Add)

1. **Pivot Point Calculator** ⚠️
   - Auto-calculate daily, weekly, monthly pivots
   - Display on chart

2. **ATR-Based Stop Loss Tool** ⚠️
   - Calculate stop distance using ATR
   - Suggest position size

3. **Seasonality Analyzer** ⚠️
   - Show historical monthly performance
   - Highlight strong/weak periods

4. **Real Interest Rate Calculator** ⚠️
   - Nominal rate - inflation = real rate
   - Show correlation with gold

5. **VIX/Gold Correlation** ⚠️
   - Monitor fear index
   - Alert on VIX spikes

6. **Fed Funds Futures Data** ⚠️
   - Market-implied rate expectations
   - Track policy shifts

---

## Recommended Tool Additions

Based on strategy analysis, these tools should be prioritized:

### High Priority
1. **Pivot Point Tool** - Used in 4+ strategies
2. **ATR Indicator & Calculator** - Used in 6+ strategies
3. **Multi-Timeframe Analysis** - Used in 8+ strategies
4. **Volume Profile** - Used in 5+ strategies

### Medium Priority
5. **Seasonality Chart** - Used in 2 strategies
6. **Correlation Dashboard** - Used in 3 strategies
7. **Volatility Scanner** - Used in 4 strategies

### Low Priority (Advanced)
8. **Options Flow Tracker** - Niche use
9. **Arbitrage Scanner** - Expert only
10. **ML Prediction Engine** - Requires significant development

---

**Last Updated:** 2025-12-10
**Total Strategies Documented:** 16
**Strategy Categories:** 7
