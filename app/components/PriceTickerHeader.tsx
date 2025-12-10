'use client';

import { useEffect, useState } from 'react';
import { useStore } from '@/lib/store';
import { TrendingUp, TrendingDown } from 'lucide-react';

export function PriceTickerHeader() {
  const { goldPrice, updateGoldPrice } = useStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);

    // Update price every 5 seconds
    const interval = setInterval(() => {
      updateGoldPrice();
    }, 5000);

    return () => clearInterval(interval);
  }, [updateGoldPrice]);

  const isPositive = goldPrice.change24h >= 0;
  const changeColor = isPositive ? 'text-green-400' : 'text-red-400';
  const bgColor = isPositive ? 'bg-green-600/10' : 'bg-red-600/10';

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-gray-900 border-b border-gray-800 z-50">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-lg flex items-center justify-center">
            <span className="text-xl font-bold text-white">Au</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">Spot Gold Trading</h1>
            <p className="text-xs text-gray-500">Real-time Analysis</p>
          </div>
        </div>

        {/* Price Ticker */}
        <div className="flex items-center gap-8">
          {/* Current Price */}
          <div>
            <p className="text-xs text-gray-500 mb-1">GOLD/USD</p>
            <p className="text-2xl font-bold text-white">
              ${goldPrice.price.toLocaleString()}
            </p>
          </div>

          {/* 24h Change */}
          <div className={`px-4 py-2 rounded-lg ${bgColor}`}>
            <div className="flex items-center gap-2">
              {isPositive ? (
                <TrendingUp className="w-4 h-4 text-green-400" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-400" />
              )}
              <div>
                <p className={`text-sm font-semibold ${changeColor}`}>
                  {isPositive ? '+' : ''}{goldPrice.change24h.toFixed(2)}
                </p>
                <p className={`text-xs ${changeColor}`}>
                  {isPositive ? '+' : ''}{goldPrice.changePercent24h.toFixed(2)}%
                </p>
              </div>
            </div>
          </div>

          {/* 24h High/Low */}
          <div className="text-sm">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-gray-500">H:</span>
              <span className="text-green-400 font-medium">
                ${goldPrice.high24h.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">L:</span>
              <span className="text-red-400 font-medium">
                ${goldPrice.low24h.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Last Update */}
          <div className="text-xs text-gray-500">
            <p>Last Update</p>
            <p className="font-medium text-gray-400">
              {mounted ? new Date(goldPrice.timestamp).toLocaleTimeString() : '--:--:--'}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
