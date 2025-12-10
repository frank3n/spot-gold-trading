'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import { calculatePortfolioPL } from '@/lib/calculations';
import { generateId } from '@/lib/utils';
import { Plus, Trash2, TrendingUp, TrendingDown } from 'lucide-react';
import type { PortfolioPosition } from '@/lib/types';

export default function PortfolioPage() {
  const { positions, goldPrice, addPosition, removePosition } = useStore();
  const [showAddForm, setShowAddForm] = useState(false);

  // Form state
  const [type, setType] = useState<'physical' | 'etf' | 'future'>('physical');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState<'oz' | 'gram' | 'shares'>('oz');
  const [avgCostBasis, setAvgCostBasis] = useState('');
  const [notes, setNotes] = useState('');

  const handleAddPosition = () => {
    if (!quantity || !avgCostBasis) return;

    const newPosition: PortfolioPosition = {
      id: generateId(),
      type,
      quantity: parseFloat(quantity),
      unit,
      avgCostBasis: parseFloat(avgCostBasis),
      purchaseDate: new Date(),
      notes: notes || undefined,
    };

    addPosition(newPosition);

    // Reset form
    setQuantity('');
    setAvgCostBasis('');
    setNotes('');
    setShowAddForm(false);
  };

  // Calculate total portfolio value
  const totalPortfolio = positions.reduce((acc, position) => {
    const pl = calculatePortfolioPL(
      position.quantity,
      position.avgCostBasis,
      goldPrice.price,
      position.unit
    );
    return {
      totalValue: acc.totalValue + pl.totalValue,
      costBasis: acc.costBasis + pl.costBasis,
      unrealizedPL: acc.unrealizedPL + pl.unrealizedPL,
    };
  }, { totalValue: 0, costBasis: 0, unrealizedPL: 0 });

  const totalPLPercent = totalPortfolio.costBasis > 0
    ? (totalPortfolio.unrealizedPL / totalPortfolio.costBasis) * 100
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Portfolio</h1>
          <p className="text-gray-400 mt-1">Track your gold holdings</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Position
        </button>
      </div>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
          <p className="text-gray-400 text-sm mb-2">Total Value</p>
          <p className="text-3xl font-bold text-white">
            ${totalPortfolio.totalValue.toLocaleString()}
          </p>
        </div>
        <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
          <p className="text-gray-400 text-sm mb-2">Cost Basis</p>
          <p className="text-3xl font-bold text-white">
            ${totalPortfolio.costBasis.toLocaleString()}
          </p>
        </div>
        <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
          <p className="text-gray-400 text-sm mb-2">Unrealized P/L</p>
          <div className="flex items-center gap-2">
            {totalPortfolio.unrealizedPL >= 0 ? (
              <TrendingUp className="w-6 h-6 text-green-400" />
            ) : (
              <TrendingDown className="w-6 h-6 text-red-400" />
            )}
            <div>
              <p className={`text-3xl font-bold ${totalPortfolio.unrealizedPL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {totalPortfolio.unrealizedPL >= 0 ? '+' : ''}${totalPortfolio.unrealizedPL.toLocaleString()}
              </p>
              <p className={`text-sm ${totalPortfolio.unrealizedPL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {totalPLPercent >= 0 ? '+' : ''}{totalPLPercent.toFixed(2)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Position Form */}
      {showAddForm && (
        <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
          <h2 className="text-xl font-semibold mb-4">Add New Position</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Position Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              >
                <option value="physical">Physical Gold</option>
                <option value="etf">ETF</option>
                <option value="future">Future</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Unit
              </label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value as any)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              >
                <option value="oz">Ounces (oz)</option>
                <option value="gram">Grams</option>
                <option value="shares">Shares</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Quantity
              </label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                placeholder="10"
                step="0.0001"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Average Cost Basis ($)
              </label>
              <input
                type="number"
                value={avgCostBasis}
                onChange={(e) => setAvgCostBasis(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                placeholder="2000"
                step="0.01"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Notes (Optional)
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                placeholder="e.g., Gold coins, SPDR GLD shares"
              />
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleAddPosition}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Add Position
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Positions Table */}
      <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Avg Cost
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Current Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  P/L
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  P/L %
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {positions.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                    No positions yet. Click "Add Position" to start tracking your portfolio.
                  </td>
                </tr>
              ) : (
                positions.map((position) => {
                  const pl = calculatePortfolioPL(
                    position.quantity,
                    position.avgCostBasis,
                    goldPrice.price,
                    position.unit
                  );

                  return (
                    <tr key={position.id} className="hover:bg-gray-800/50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium bg-blue-600/20 text-blue-400 rounded">
                          {position.type.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {position.quantity} {position.unit}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        ${position.avgCostBasis.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                        ${pl.totalValue.toLocaleString()}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${pl.unrealizedPL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {pl.unrealizedPL >= 0 ? '+' : ''}${pl.unrealizedPL.toLocaleString()}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${pl.unrealizedPLPercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {pl.unrealizedPLPercent >= 0 ? '+' : ''}{pl.unrealizedPLPercent.toFixed(2)}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {new Date(position.purchaseDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => removePosition(position.id)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
