import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Mock gold price data generator
export function generateMockGoldPrice() {
  const basePrice = 2050;
  const volatility = 15;
  const price = basePrice + (Math.random() - 0.5) * volatility;
  const change24h = (Math.random() - 0.5) * 30;

  return {
    price: Number(price.toFixed(2)),
    change24h: Number(change24h.toFixed(2)),
    changePercent24h: Number(((change24h / price) * 100).toFixed(2)),
    high24h: Number((price + Math.random() * 10).toFixed(2)),
    low24h: Number((price - Math.random() * 10).toFixed(2)),
    timestamp: new Date(),
    currency: 'USD',
  };
}

// Generate unique ID
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Local storage helpers
export function saveToLocalStorage<T>(key: string, value: T): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }
}

export function loadFromLocalStorage<T>(key: string, defaultValue: T): T {
  if (typeof window !== 'undefined') {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      return defaultValue;
    }
  }
  return defaultValue;
}
