'use client';

import { useState } from 'react';
import { calculateATRStopLoss } from '@/lib/calculations';
import { TrendingUp, TrendingDown } from 'lucide-react';

export function ATRCalculator() {
  const [currentPrice, setCurrentPrice] = useState<string>('2050');
  const [atr, setAtr] = useState<string>('15');
  const [multiplier, setMultiplier] = useState<string>('2');
  const [direction, setDirection] = useState<'long' | 'short'>('long');

  const calculateResults = () => {
    const price = parseFloat(currentPrice);
    const atrValue = parseFloat(atr);
    const mult = parseFloat(multiplier);

    if (!price || !atrValue || !mult) return null;

    return calculateATRStopLoss(price, atrValue, mult, direction);
  };

  const results = calculateResults();

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
          {direction === 'long' ? (
            <TrendingUp className="w-5 h-5 text-white" />
          ) : (
            <TrendingDown className="w-5 h-5 text-white" />
          )}
        </div>
        <div>
          <h2 className="text-lg font-semibold">ATR Stop Loss</h2>
          <p className="text-sm text-gray-400">Calculate volatility-based stops</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Direction Toggle */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Position Direction
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setDirection('long')}
              className={`py-2 px-4 rounded-lg font-medium transition-colors ${
                direction === 'long'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              Long
            </button>
            <button
              onClick={() => setDirection('short')}
              className={`py-2 px-4 rounded-lg font-medium transition-colors ${
                direction === 'short'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              Short
            </button>
          </div>
        </div>

        {/* Current Price */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Current Price ($)
          </label>
          <input
            type="number"
            value={currentPrice}
            onChange={(e) => setCurrentPrice(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
            placeholder="2050"
            step="0.01"
          />
        </div>

        {/* ATR Value */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            ATR Value ($)
          </label>
          <input
            type="number"
            value={atr}
            onChange={(e) => setAtr(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
            placeholder="15"
            step="0.01"
          />
        </div>

        {/* Multiplier */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            ATR Multiplier
          </label>
          <input
            type="number"
            value={multiplier}
            onChange={(e) => setMultiplier(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
            placeholder="2"
            step="0.1"
          />
        </div>

        {/* Results */}
        {results && (
          <div className="mt-6 pt-6 border-t border-gray-800 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Stop Loss</span>
              <span className="text-xl font-bold text-white">
                ${results.stopLoss.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Stop Distance</span>
              <span className="text-gray-300">
                ${results.stopDistance.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Pips</span>
              <span className="text-gray-300">
                {results.stopDistancePips}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
