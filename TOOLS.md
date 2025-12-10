# Website-Based Tools - Detailed Specifications

## 1. Live Price Ticker

### Features
- Real-time XAU/USD spot price
- 24-hour change ($ and %)
- High/Low of the day
- Bid/Ask spread
- Last update timestamp

### Implementation
```typescript
interface GoldPrice {
  price: number;
  change24h: number;
  changePercent24h: number;
  high24h: number;
  low24h: number;
  bid: number;
  ask: number;
  spread: number;
  timestamp: Date;
  currency: string;
}
```

### Data Update Frequency
- WebSocket: Real-time (< 1 second)
- HTTP Polling fallback: Every 5 seconds

---

## 2. Interactive Price Chart

### Chart Types
- **Candlestick** - OHLC data
- **Line Chart** - Close price only
- **Area Chart** - Filled line chart
- **Heikin Ashi** - Modified candlesticks

### Timeframes
- 1 minute, 5 minutes, 15 minutes, 30 minutes
- 1 hour, 4 hours, 12 hours
- 1 day, 1 week, 1 month

### Technical Indicators (Included)
1. **Trend Indicators**
   - Simple Moving Average (SMA)
   - Exponential Moving Average (EMA)
   - Weighted Moving Average (WMA)
   - Ichimoku Cloud
   - Parabolic SAR

2. **Momentum Indicators**
   - RSI (Relative Strength Index)
   - Stochastic Oscillator
   - MACD (Moving Average Convergence Divergence)
   - CCI (Commodity Channel Index)
   - Williams %R

3. **Volatility Indicators**
   - Bollinger Bands
   - ATR (Average True Range)
   - Keltner Channels
   - Donchian Channels

4. **Volume Indicators**
   - Volume bars
   - OBV (On-Balance Volume)
   - Volume Profile

### Drawing Tools
- Trendlines
- Horizontal lines
- Fibonacci retracement
- Fibonacci extension
- Rectangles & circles
- Text annotations

---

## 3. Price Alert System

### Alert Types

#### Simple Price Alert
- Trigger: Price crosses threshold
- Example: "Alert when gold > $2,100"

#### Percentage Change Alert
- Trigger: Price moves X% from current
- Example: "Alert on +2% or -2% move"

#### Technical Indicator Alert
- Trigger: RSI > 70, MACD crossover, etc.
- Example: "Alert when RSI crosses above 70"

#### Time-Based Alert
- Trigger: Price at specific time
- Example: "Alert at 9:30 AM EST daily"

### Notification Methods
- Email
- SMS (via Twilio)
- Push notifications (web & mobile)
- Discord/Telegram webhook
- Sound alert on website

### Alert Management
```typescript
interface PriceAlert {
  id: string;
  userId: string;
  type: 'price' | 'percentage' | 'indicator' | 'time';
  condition: {
    operator: '>' | '<' | '==' | '>=' | '<=';
    value: number;
    indicator?: string;
  };
  notificationMethods: ('email' | 'sms' | 'push')[];
  active: boolean;
  triggeredAt?: Date;
  createdAt: Date;
}
```

---

## 4. Portfolio Tracker

### Features
- Track multiple gold holdings
- Calculate average cost basis
- Real-time P&L
- Performance charts
- Export to CSV

### Portfolio Entry Types
- Physical gold (bars, coins)
- Gold ETFs (GLD, IAU, etc.)
- Gold mining stocks
- Gold futures/options
- Gold certificates

### Metrics Tracked
```typescript
interface PortfolioItem {
  id: string;
  type: 'physical' | 'etf' | 'stock' | 'future' | 'certificate';
  quantity: number;
  unit: 'oz' | 'gram' | 'kg' | 'shares';
  avgCostBasis: number;
  currentPrice: number;
  totalValue: number;
  unrealizedPL: number;
  unrealizedPLPercent: number;
  purchaseDate: Date;
}
```

---

## 5. Economic Calendar

### Event Categories
- **Central Bank Decisions**
  - Fed interest rate decisions
  - ECB policy meetings
  - Other major central banks

- **Economic Indicators**
  - CPI (Consumer Price Index)
  - PPI (Producer Price Index)
  - GDP reports
  - Employment data (NFP, unemployment)

- **Geopolitical Events**
  - Elections
  - Trade agreements
  - Conflicts

### Calendar Display
- Filter by impact (High/Medium/Low)
- Filter by region
- Time zone conversion
- Historical results
- Forecast vs Actual

---

## 6. Gold Weight & Price Calculator

### Conversions
```
Troy Ounce ⇔ Gram ⇔ Kilogram
1 oz = 31.1035 grams = 0.0311035 kg
```

### Purity Calculator
- Input: Weight & Purity (24k, 22k, 18k, 14k, etc.)
- Output: Pure gold content & value

### Profit/Loss Calculator
- Buy price, sell price, quantity
- Fees/commissions
- Net profit calculation

---

## 7. Correlation Matrix

### Assets Tracked
- Gold (XAU/USD)
- US Dollar Index (DXY)
- S&P 500 (SPX)
- Bitcoin (BTC)
- Crude Oil (WTI)
- Silver (XAG/USD)
- 10-Year Treasury Yield

### Visualization
- Heatmap with color coding
- Correlation coefficient (-1 to +1)
- Time period selection (1M, 3M, 6M, 1Y)
- Rolling correlation charts

---

## 8. News Aggregator

### News Sources
- Reuters
- Bloomberg
- CNBC
- Kitco News
- World Gold Council
- Mining.com

### Features
- Real-time updates
- Keyword filtering
- Sentiment analysis
- Save articles
- Share functionality

---

## 9. Sentiment Analysis Tool

### Data Sources
- Twitter/X mentions
- Reddit discussions
- News article sentiment
- Google Trends
- StockTwits

### Sentiment Score
```typescript
interface SentimentData {
  score: number; // -1 (bearish) to +1 (bullish)
  confidence: number; // 0 to 1
  sources: {
    twitter: number;
    reddit: number;
    news: number;
  };
  trend: 'increasing' | 'decreasing' | 'stable';
  timestamp: Date;
}
```

---

## 10. Backtesting Engine

### Strategy Builder
- Define entry/exit rules
- Set position sizing
- Risk management rules
- Stop loss / Take profit

### Backtesting Metrics
- Total return
- Sharpe ratio
- Max drawdown
- Win rate
- Average win/loss
- Profit factor

### Report Generation
```typescript
interface BacktestResult {
  strategy: string;
  period: { start: Date; end: Date };
  totalTrades: number;
  winningTrades: number;
  losingTrades: number;
  totalReturn: number;
  sharpeRatio: number;
  maxDrawdown: number;
  avgWin: number;
  avgLoss: number;
  profitFactor: number;
  trades: Trade[];
}
```

---

## 11. Seasonality Analyzer

### Analysis Features
- Average monthly returns
- Best/worst performing months
- Seasonal patterns by year
- Holiday effects
- Quarter-end patterns

### Visualization
- Heatmap by month/year
- Bar chart of average returns
- Box plots showing distribution

---

## 12. Volatility Dashboard

### Metrics Displayed
- Historical Volatility (10-day, 30-day)
- Implied Volatility (from options)
- ATR (Average True Range)
- Bollinger Band Width
- VIX correlation

### Volatility Alerts
- Alert on volatility spikes
- Compare to historical averages
- Regime detection (low/high volatility)

---

## 13. Options Chain Viewer (Gold ETFs)

### Display Options
- Calls & Puts side by side
- Strike prices
- Bid/Ask prices
- Volume & Open Interest
- Greeks (Delta, Gamma, Theta, Vega)
- Implied Volatility

### Analysis Tools
- Max pain calculation
- Put/Call ratio
- Unusual activity detection
- Options flow alerts

---

## 14. Mobile Companion Features

### Must-Have Features
- Live price widget
- Push notifications for alerts
- Quick portfolio view
- News feed
- Simple chart view

### Offline Capabilities
- Cache latest prices
- Saved charts
- Offline news reading

---

## 15. API Documentation

### Endpoints
```
GET /api/price/current
GET /api/price/historical?from=DATE&to=DATE
GET /api/indicators?timeframe=1h&indicators=RSI,MACD
GET /api/news?limit=10
POST /api/alerts
GET /api/portfolio
```

### Rate Limits
- Free: 100 requests/hour
- Pro: 1,000 requests/hour
- Premium: 10,000 requests/hour

### Authentication
```
Authorization: Bearer YOUR_API_KEY
```

---

## Implementation Priority

### High Priority (MVP)
1. Live Price Ticker
2. Basic Chart (line chart with 1D timeframe)
3. Price Alerts (email only)
4. News Feed
5. Simple Calculator

### Medium Priority
6. Advanced Charting (TradingView integration)
7. Portfolio Tracker
8. Economic Calendar
9. Correlation Matrix
10. Technical Indicators

### Low Priority (Premium Features)
11. Backtesting Engine
12. AI Predictions
13. Options Chain
14. Advanced Analytics
15. Mobile App

---

**Last Updated:** 2025-12-10
