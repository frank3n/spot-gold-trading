'use client';

import { useState } from 'react';
import { calculatePivotPoints } from '@/lib/calculations';
import { Target } from 'lucide-react';

export function PivotPointCalculator() {
  const [high, setHigh] = useState<string>('2060');
  const [low, setLow] = useState<string>('2040');
  const [close, setClose] = useState<string>('2050');

  const calculateResults = () => {
    const h = parseFloat(high);
    const l = parseFloat(low);
    const c = parseFloat(close);

    if (!h || !l || !c) return null;

    return calculatePivotPoints(h, l, c);
  };

  const results = calculateResults();

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center">
          <Target className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-semibold">Pivot Points</h2>
          <p className="text-sm text-gray-400">Support & resistance levels</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Previous High */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Previous High ($)
          </label>
          <input
            type="number"
            value={high}
            onChange={(e) => setHigh(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500"
            placeholder="2060"
            step="0.01"
          />
        </div>

        {/* Previous Low */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Previous Low ($)
          </label>
          <input
            type="number"
            value={low}
            onChange={(e) => setLow(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500"
            placeholder="2040"
            step="0.01"
          />
        </div>

        {/* Previous Close */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Previous Close ($)
          </label>
          <input
            type="number"
            value={close}
            onChange={(e) => setClose(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500"
            placeholder="2050"
            step="0.01"
          />
        </div>

        {/* Results */}
        {results && (
          <div className="mt-6 pt-6 border-t border-gray-800 space-y-3">
            {/* Resistance Levels */}
            <div className="space-y-2">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Resistance
              </h3>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">R3</span>
                <span className="text-sm font-medium text-red-400">
                  ${results.r3.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">R2</span>
                <span className="text-sm font-medium text-red-400">
                  ${results.r2.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">R1</span>
                <span className="text-sm font-medium text-red-400">
                  ${results.r1.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Pivot Point */}
            <div className="py-2 px-3 bg-amber-600/20 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-amber-400">PP</span>
                <span className="text-lg font-bold text-amber-400">
                  ${results.pp.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Support Levels */}
            <div className="space-y-2">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Support
              </h3>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">S1</span>
                <span className="text-sm font-medium text-green-400">
                  ${results.s1.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">S2</span>
                <span className="text-sm font-medium text-green-400">
                  ${results.s2.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">S3</span>
                <span className="text-sm font-medium text-green-400">
                  ${results.s3.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
