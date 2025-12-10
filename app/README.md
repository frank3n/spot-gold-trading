# Spot Gold Trading Platform - MVP

A professional real-time gold trading platform built with Next.js, TypeScript, and Tailwind CSS.

## Features

### Trading Tools
- **ATR Stop Loss Calculator**: Calculate volatility-based stop loss levels using Average True Range
- **Position Size Calculator**: Determine optimal position sizing based on risk management
- **Pivot Point Calculator**: Calculate daily pivot points with support (S1-S3) and resistance (R1-R3) levels

### Portfolio Management
- Track physical gold, ETFs, and futures positions
- Real-time P/L calculations
- Support for multiple units (oz, grams, shares)
- LocalStorage persistence

### Price Alerts
- Create custom price alerts (above/below targets)
- Browser notification support
- Track triggered and active alerts
- Alert history

### Live Price Ticker
- Real-time gold price updates (mock data)
- 24h change tracking
- High/Low indicators
- Auto-refresh every 5 seconds

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Icons**: Lucide React
- **Utilities**: date-fns, clsx, tailwind-merge

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/frank3n/spot-gold-trading.git
cd spot-gold-trading/app
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
app/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout with sidebar and header
│   ├── page.tsx             # Dashboard (home page)
│   ├── tools/               # Trading tools page
│   ├── portfolio/           # Portfolio tracker page
│   ├── alerts/              # Price alerts page
│   ├── strategies/          # Trading strategies info
│   └── settings/            # Settings page
├── components/              # React components
│   ├── ATRCalculator.tsx
│   ├── PositionSizeCalculator.tsx
│   ├── PivotPointCalculator.tsx
│   ├── Sidebar.tsx
│   └── PriceTickerHeader.tsx
└── lib/                     # Utilities and business logic
    ├── types.ts             # TypeScript interfaces
    ├── calculations.ts      # Trading calculator logic
    ├── utils.ts             # Utility functions
    └── store.ts             # Zustand state management
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Features in Detail

### ATR Calculator
- Input: Current price, ATR value, multiplier
- Output: Stop loss level, stop distance, pips
- Supports both long and short positions

### Position Size Calculator
- Input: Account balance, risk %, entry price, stop loss
- Output: Position size ($), position size (oz), risk amount, potential loss
- Follows 1-2% risk management best practices

### Pivot Point Calculator
- Input: Previous high, low, close
- Output: Pivot point (PP), R1-R3, S1-S3
- Standard pivot point formula

### Portfolio Tracker
- Add/remove positions
- Track physical gold, ETFs, futures
- Real-time P/L calculation
- Support for oz, grams, shares
- LocalStorage persistence

### Price Alerts
- Set price above/below alerts
- Browser notifications (requires permission)
- Alert triggering based on mock price updates
- Enable/disable alerts
- Alert history

## Data Persistence

The application uses browser LocalStorage to persist:
- Portfolio positions
- Price alerts
- User preferences (coming soon)

## Mock Data

Currently, the application uses mock gold price data that:
- Updates every 5 seconds
- Simulates realistic price movements
- Base price around $2,050
- Volatility of ~$15

## Future Enhancements

See [SPRINT-PLAN.md](../SPRINT-PLAN.md) for the full roadmap, including:
- Real-time price API integration
- Advanced charting with TradingView
- Historical data analysis
- More trading strategies
- Export/import functionality
- Multi-currency support

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

Browser notifications require user permission and HTTPS in production.

## Development Notes

- The app uses Next.js 14 App Router (not Pages Router)
- All components are client components ("use client")
- State management with Zustand (lightweight alternative to Redux)
- Dark mode only (light mode coming soon)
- Mobile responsive design

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

**Status**: MVP Complete (v1.0.0)
**Last Updated**: December 10, 2025
