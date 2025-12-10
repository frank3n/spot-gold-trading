import { ATRCalculator } from '@/components/ATRCalculator';
import { PositionSizeCalculator } from '@/components/PositionSizeCalculator';
import { PivotPointCalculator } from '@/components/PivotPointCalculator';

export default function Home() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Trading Tools</h1>
        <p className="text-gray-400 mt-1">Calculate risk, position size, and pivot points</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* ATR Calculator */}
        <ATRCalculator />

        {/* Position Size Calculator */}
        <PositionSizeCalculator />

        {/* Pivot Point Calculator */}
        <PivotPointCalculator />
      </div>
    </div>
  );
}
