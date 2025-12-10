import { ATRCalculator } from '@/components/ATRCalculator';
import { PositionSizeCalculator } from '@/components/PositionSizeCalculator';
import { PivotPointCalculator } from '@/components/PivotPointCalculator';

export default function ToolsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Trading Tools</h1>
        <p className="text-gray-400 mt-1">Professional calculators for gold trading</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* ATR Calculator */}
        <ATRCalculator />

        {/* Position Size Calculator */}
        <PositionSizeCalculator />

        {/* Pivot Point Calculator */}
        <PivotPointCalculator />
      </div>

      {/* Additional Info */}
      <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
        <h2 className="text-xl font-semibold mb-3">How to Use These Tools</h2>
        <div className="space-y-4 text-gray-300">
          <div>
            <h3 className="font-medium text-white mb-1">ATR Stop Loss Calculator</h3>
            <p className="text-sm">
              Calculate volatility-based stop loss levels using Average True Range (ATR).
              Enter your current price, ATR value, and multiplier to determine optimal stop loss placement.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-white mb-1">Position Size Calculator</h3>
            <p className="text-sm">
              Determine the correct position size based on your risk tolerance.
              Input your account balance, risk percentage, entry price, and stop loss to calculate position size in dollars and ounces.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-white mb-1">Pivot Point Calculator</h3>
            <p className="text-sm">
              Calculate key support and resistance levels for day trading.
              Enter the previous period's high, low, and close to get pivot point, resistance (R1-R3), and support (S1-S3) levels.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
