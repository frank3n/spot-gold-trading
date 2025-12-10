'use client';

import { useState } from 'react';
import { calculatePositionSize } from '@/lib/calculations';
import { Calculator } from 'lucide-react';

export function PositionSizeCalculator() {
  const [accountBalance, setAccountBalance] = useState<string>('10000');
  const [riskPercent, setRiskPercent] = useState<string>('1');
  const [entryPrice, setEntryPrice] = useState<string>('2050');
  const [stopLoss, setStopLoss] = useState<string>('2020');

  const calculateResults = () => {
    const balance = parseFloat(accountBalance);
    const risk = parseFloat(riskPercent);
    const entry = parseFloat(entryPrice);
    const stop = parseFloat(stopLoss);

    if (!balance || !risk || !entry || !stop) return null;

    return calculatePositionSize(balance, risk, entry, stop);
  };

  const results = calculateResults();

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
          <Calculator className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-semibold">Position Size</h2>
          <p className="text-sm text-gray-400">Risk-based position sizing</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Account Balance */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Account Balance ($)
          </label>
          <input
            type="number"
            value={accountBalance}
            onChange={(e) => setAccountBalance(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
            placeholder="10000"
            step="100"
          />
        </div>

        {/* Risk Percentage */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Risk per Trade (%)
          </label>
          <input
            type="number"
            value={riskPercent}
            onChange={(e) => setRiskPercent(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
            placeholder="1"
            step="0.1"
            min="0"
            max="100"
          />
          <p className="mt-1 text-xs text-gray-500">
            Recommended: 1-2% per trade
          </p>
        </div>

        {/* Entry Price */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Entry Price ($)
          </label>
          <input
            type="number"
            value={entryPrice}
            onChange={(e) => setEntryPrice(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
            placeholder="2050"
            step="0.01"
          />
        </div>

        {/* Stop Loss */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Stop Loss ($)
          </label>
          <input
            type="number"
            value={stopLoss}
            onChange={(e) => setStopLoss(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
            placeholder="2020"
            step="0.01"
          />
        </div>

        {/* Results */}
        {results && (
          <div className="mt-6 pt-6 border-t border-gray-800 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Position Size</span>
              <span className="text-xl font-bold text-white">
                ${results.positionSize.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Size (oz)</span>
              <span className="text-gray-300">
                {results.positionSizeOz.toFixed(4)} oz
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Risk Amount</span>
              <span className="text-red-400">
                ${results.riskAmount.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Potential Loss</span>
              <span className="text-red-400">
                ${results.potentialLoss.toLocaleString()}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
