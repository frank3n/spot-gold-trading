// Core TypeScript types for the application

export interface GoldPrice {
  price: number;
  change24h: number;
  changePercent24h: number;
  high24h: number;
  low24h: number;
  timestamp: Date;
  currency: string;
}

export interface PortfolioPosition {
  id: string;
  type: 'physical' | 'etf' | 'future';
  quantity: number;
  unit: 'oz' | 'gram' | 'shares';
  avgCostBasis: number;
  purchaseDate: Date;
  notes?: string;
}

export interface PriceAlert {
  id: string;
  type: 'price' | 'percentage';
  condition: '>' | '<' | '==';
  value: number;
  active: boolean;
  createdAt: Date;
  triggeredAt?: Date;
  notificationMethod: 'browser' | 'email';
}

export interface CalculatorResult {
  value: number;
  label: string;
  unit: string;
}

export interface PivotPoints {
  pp: number;
  r1: number;
  r2: number;
  r3: number;
  s1: number;
  s2: number;
  s3: number;
}
