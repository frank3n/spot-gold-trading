# Claude Pro Coding Sprint Plan

## Claude Pro Capabilities Assessment

**Claude Pro Plan Features:**
- Extended conversation length
- Higher usage limits
- ~25,000 tokens per response
- Suitable for multi-file projects
- Can handle full-stack development

**Realistic Sprint Scope:**
- Duration: 1-2 sessions (continuous work)
- Output: Functional MVP prototype
- Code volume: 15-20 files, ~3,000-5,000 lines
- Focus: Core features that work, not perfection

---

## Sprint Goal

**Build a working MVP of the Spot Gold Trading Platform** with:
1. Real-time gold price display
2. Interactive price chart
3. Essential calculators (ATR, Position Size, Pivot Points)
4. Price alerts system
5. Basic portfolio tracker

**Target:** Functional prototype you can actually run and test

---

## Tech Stack (Optimized for Speed)

### Frontend (Next.js 14 - All-in-one)
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **UI:** Tailwind CSS + shadcn/ui
- **Charts:** Lightweight Charts (TradingView)
- **State:** Zustand (simple, fast)
- **Data Fetching:** React Query

**Why:** Next.js handles both frontend and API in one project = faster development

### Backend (Built into Next.js)
- **API Routes:** Next.js API Routes
- **Database:** SQLite (local, no setup needed) or Supabase (free tier)
- **Real-time:** WebSocket via Socket.io
- **Validation:** Zod

### Data Sources (Free Tiers)
- **Gold Prices:** Alpha Vantage (free 25 calls/day) or Twelve Data
- **Fallback:** Mock data for development
- **Economic Calendar:** Forex Factory scraping or mock data

---

## Sprint Deliverables (What We'll Build)

### 1. Project Setup (5 min)
- [x] Next.js 14 with TypeScript
- [x] Tailwind CSS configured
- [x] shadcn/ui components
- [x] Folder structure
- [x] Environment variables

### 2. Core Components (30 min)
- [ ] Layout with sidebar
- [ ] Navigation
- [ ] Dark mode toggle
- [ ] Responsive design

### 3. Price Display (45 min)
- [ ] Live price ticker component
- [ ] Price fetching from API
- [ ] WebSocket connection (mock for now)
- [ ] 24h change display
- [ ] Currency switcher (USD, EUR)

### 4. Interactive Chart (60 min)
- [ ] TradingView Lightweight Charts integration
- [ ] Candlestick chart
- [ ] Timeframe selector (1H, 4H, 1D, 1W)
- [ ] Volume bars
- [ ] Basic indicators (MA, RSI)
- [ ] Drawing tools (trendlines)

### 5. Calculators (45 min)
- [ ] **ATR Calculator**
  - Input: Price, ATR, multiplier
  - Output: Stop loss level, distance

- [ ] **Position Size Calculator**
  - Input: Account size, risk %, stop distance
  - Output: Position size in oz/lots

- [ ] **Pivot Point Calculator**
  - Input: Previous day H/L/C
  - Output: PP, R1-R3, S1-S3

### 6. Price Alerts (30 min)
- [ ] Alert creation form
- [ ] Alert list display
- [ ] Local storage persistence
- [ ] Browser notification (demo)

### 7. Portfolio Tracker (30 min)
- [ ] Add position form
- [ ] Position list with P/L
- [ ] Total portfolio value
- [ ] Local storage

### 8. API Integration (45 min)
- [ ] Alpha Vantage integration
- [ ] Price data endpoints
- [ ] Historical data endpoint
- [ ] Error handling
- [ ] Rate limiting

### 9. Polish & Testing (30 min)
- [ ] Loading states
- [ ] Error states
- [ ] Responsive fixes
- [ ] Basic testing

---

## Total Estimated Time: 5-6 hours

**Realistic in Claude Pro:** YES ✅
- Can be done in 1-2 continuous sessions
- Focus on functionality over perfection
- Use component libraries to speed up UI
- Mock data where API limits exist

---

## File Structure

```
spot-gold-trading/
├── app/
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Dashboard
│   ├── api/
│   │   ├── price/route.ts         # Current price
│   │   ├── historical/route.ts    # Historical data
│   │   └── alerts/route.ts        # Alerts CRUD
│   ├── calculators/
│   │   └── page.tsx               # Calculator tools
│   ├── portfolio/
│   │   └── page.tsx               # Portfolio tracker
│   └── alerts/
│       └── page.tsx               # Alerts management
├── components/
│   ├── ui/                        # shadcn components
│   ├── PriceTicker.tsx
│   ├── PriceChart.tsx
│   ├── ATRCalculator.tsx
│   ├── PositionSizeCalculator.tsx
│   ├── PivotPointCalculator.tsx
│   ├── AlertForm.tsx
│   ├── AlertList.tsx
│   ├── PortfolioTable.tsx
│   └── Sidebar.tsx
├── lib/
│   ├── api/
│   │   └── goldPrice.ts           # API client
│   ├── utils.ts                   # Utilities
│   ├── calculations.ts            # Calculator logic
│   └── types.ts                   # TypeScript types
├── hooks/
│   ├── useGoldPrice.ts
│   ├── useAlerts.ts
│   └── usePortfolio.ts
├── stores/
│   └── useStore.ts                # Zustand store
└── public/
    └── mock-data/
        └── prices.json            # Mock price data
```

---

## Sprint Execution Plan

### Phase 1: Foundation (30 min)
```bash
# Setup Next.js
npx create-next-app@latest spot-gold-trading-app --typescript --tailwind --app

# Install dependencies
npm install @tanstack/react-query zustand lightweight-charts
npm install lucide-react date-fns axios

# Install shadcn/ui
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card input select label
```

### Phase 2: Core Features (2 hours)
- Build layout and navigation
- Implement price ticker
- Create chart component
- API integration

### Phase 3: Tools (1.5 hours)
- Build all 3 calculators
- Form validation
- Results display

### Phase 4: Alerts & Portfolio (1 hour)
- Alert creation/management
- Portfolio tracking
- Local storage

### Phase 5: Polish (1 hour)
- Styling
- Responsive design
- Error handling
- Loading states

---

## Success Criteria

**MVP is successful if:**
1. ✅ Can see live gold price
2. ✅ Can view price chart with different timeframes
3. ✅ Can calculate ATR stop loss
4. ✅ Can calculate position size
5. ✅ Can calculate pivot points
6. ✅ Can create and view price alerts
7. ✅ Can track portfolio with P/L
8. ✅ UI is clean and usable
9. ✅ Responsive on mobile
10. ✅ Can run locally with `npm run dev`

---

## What We're NOT Building (Yet)

**Deferred to Later:**
- ❌ Real WebSocket connections (mock for now)
- ❌ User authentication (local storage only)
- ❌ Database (use local storage/mock data)
- ❌ Advanced indicators (just MA and RSI)
- ❌ News feed integration
- ❌ Economic calendar
- ❌ Backtesting engine
- ❌ AI predictions
- ❌ Mobile app

**Focus:** Get core tools working first

---

## API Strategy (Free Tier)

### Alpha Vantage (Free)
- Endpoint: `https://www.alphavantage.co/query`
- Rate Limit: 25 calls/day (free), 500/day (premium $50/mo)
- Function: `CURRENCY_EXCHANGE_RATE` for XAU/USD

**For Development:**
- Use mock data
- Cache API responses
- Implement request batching

### Fallback: Twelve Data (Free)
- Rate Limit: 800 calls/day (free)
- Better for development

---

## Data Flow

```
User Request
    ↓
React Component
    ↓
React Query (caching)
    ↓
API Route (/api/price)
    ↓
External API (Alpha Vantage)
    ↓
Cache in memory (5 min)
    ↓
Return to component
```

---

## Deployment Strategy

**For MVP:**
- Deploy to Vercel (free tier)
- Use Vercel KV for caching (free tier)
- Use environment variables for API keys

**One-click deploy:**
```bash
vercel --prod
```

---

## Let's Start Coding! 🚀

**Current Plan:**
1. Create Next.js project structure
2. Build core components
3. Implement calculators
4. Add price display and chart
5. Create working MVP

**Estimated completion:** 5-6 hours of focused work

Ready to begin! 💻
