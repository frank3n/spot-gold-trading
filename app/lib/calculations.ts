// Calculator logic for trading tools

import { PivotPoints } from './types';

// ATR-based Stop Loss Calculator
export function calculateATRStopLoss(
  currentPrice: number,
  atr: number,
  multiplier: number,
  direction: 'long' | 'short'
): {
  stopLoss: number;
  stopDistance: number;
  stopDistancePips: number;
} {
  const stopDistance = atr * multiplier;
  const stopDistancePips = Math.round((stopDistance / currentPrice) * 10000);

  const stopLoss = direction === 'long'
    ? currentPrice - stopDistance
    : currentPrice + stopDistance;

  return {
    stopLoss: Number(stopLoss.toFixed(2)),
    stopDistance: Number(stopDistance.toFixed(2)),
    stopDistancePips,
  };
}

// Position Size Calculator
export function calculatePositionSize(
  accountBalance: number,
  riskPercent: number,
  entryPrice: number,
  stopLoss: number
): {
  positionSize: number;
  positionSizeOz: number;
  riskAmount: number;
  potentialLoss: number;
} {
  const riskAmount = accountBalance * (riskPercent / 100);
  const stopDistance = Math.abs(entryPrice - stopLoss);
  const positionSize = riskAmount / stopDistance;
  const positionSizeOz = positionSize / entryPrice;
  const potentialLoss = positionSizeOz * stopDistance;

  return {
    positionSize: Number(positionSize.toFixed(2)),
    positionSizeOz: Number(positionSizeOz.toFixed(4)),
    riskAmount: Number(riskAmount.toFixed(2)),
    potentialLoss: Number(potentialLoss.toFixed(2)),
  };
}

// Pivot Point Calculator
export function calculatePivotPoints(
  high: number,
  low: number,
  close: number
): PivotPoints {
  const pp = (high + low + close) / 3;

  // Resistance levels
  const r1 = (2 * pp) - low;
  const r2 = pp + (high - low);
  const r3 = high + 2 * (pp - low);

  // Support levels
  const s1 = (2 * pp) - high;
  const s2 = pp - (high - low);
  const s3 = low - 2 * (high - pp);

  return {
    pp: Number(pp.toFixed(2)),
    r1: Number(r1.toFixed(2)),
    r2: Number(r2.toFixed(2)),
    r3: Number(r3.toFixed(2)),
    s1: Number(s1.toFixed(2)),
    s2: Number(s2.toFixed(2)),
    s3: Number(s3.toFixed(2)),
  };
}

// Portfolio P/L Calculator
export function calculatePortfolioPL(
  quantity: number,
  avgCost: number,
  currentPrice: number,
  unit: 'oz' | 'gram' | 'shares'
): {
  totalValue: number;
  unrealizedPL: number;
  unrealizedPLPercent: number;
  costBasis: number;
} {
  // Convert grams to oz if needed (1 oz = 31.1035 grams)
  const ozQuantity = unit === 'gram' ? quantity / 31.1035 : quantity;

  const costBasis = ozQuantity * avgCost;
  const totalValue = ozQuantity * currentPrice;
  const unrealizedPL = totalValue - costBasis;
  const unrealizedPLPercent = (unrealizedPL / costBasis) * 100;

  return {
    totalValue: Number(totalValue.toFixed(2)),
    unrealizedPL: Number(unrealizedPL.toFixed(2)),
    unrealizedPLPercent: Number(unrealizedPLPercent.toFixed(2)),
    costBasis: Number(costBasis.toFixed(2)),
  };
}

// Check if price alert should trigger
export function shouldTriggerAlert(
  currentPrice: number,
  alertPrice: number,
  condition: '>' | '<' | '=='
): boolean {
  switch (condition) {
    case '>':
      return currentPrice > alertPrice;
    case '<':
      return currentPrice < alertPrice;
    case '==':
      return Math.abs(currentPrice - alertPrice) < 0.5; // Within $0.50
    default:
      return false;
  }
}

// Format currency
export function formatCurrency(value: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

// Format percentage
export function formatPercent(value: number): string {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
}
