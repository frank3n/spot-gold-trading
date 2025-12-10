import { TrendingUp, Target, Zap, Shield } from 'lucide-react';

const strategies = [
  {
    name: 'Day Trading',
    icon: Zap,
    description: 'Short-term trades executed within a single trading day',
    examples: ['Opening Range Breakout', 'Pivot Point Trading', 'MA Crossover'],
    color: 'bg-yellow-600',
  },
  {
    name: 'Swing Trading',
    icon: TrendingUp,
    description: 'Hold positions for several days to weeks to capture price swings',
    examples: ['Trend Following', 'Fibonacci Retracements', 'Bollinger Band Squeeze'],
    color: 'bg-blue-600',
  },
  {
    name: 'Scalping',
    icon: Target,
    description: 'Very short-term trades to capture small price movements',
    examples: ['1-min Momentum', 'News Event Trading', 'Market Making'],
    color: 'bg-purple-600',
  },
  {
    name: 'Hedging',
    icon: Shield,
    description: 'Protect portfolio value against adverse price movements',
    examples: ['Gold/USD Correlation', 'Mining Stock Arbitrage', 'Options Hedging'],
    color: 'bg-green-600',
  },
];

export default function StrategiesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Trading Strategies</h1>
        <p className="text-gray-400 mt-1">Learn proven approaches to gold trading</p>
      </div>

      {/* Strategy Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {strategies.map((strategy) => {
          const Icon = strategy.icon;
          return (
            <div
              key={strategy.name}
              className="bg-gray-900 rounded-lg border border-gray-800 p-6 hover:bg-gray-800/50 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 ${strategy.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-2">{strategy.name}</h2>
                  <p className="text-gray-400 text-sm mb-3">{strategy.description}</p>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500 font-medium uppercase">Examples:</p>
                    {strategy.examples.map((example, idx) => (
                      <p key={idx} className="text-sm text-gray-300">• {example}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Strategy Info */}
      <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
        <h2 className="text-xl font-semibold mb-4">Key Considerations</h2>
        <div className="space-y-4 text-gray-300 text-sm">
          <div>
            <h3 className="font-medium text-white mb-1">Risk Management</h3>
            <p>
              Never risk more than 1-2% of your account on a single trade. Use stop losses consistently
              and position sizing calculators to determine appropriate trade sizes.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-white mb-1">Market Analysis</h3>
            <p>
              Combine technical analysis (charts, indicators) with fundamental analysis (economic data,
              geopolitical events) for a comprehensive trading approach.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-white mb-1">Trading Psychology</h3>
            <p>
              Maintain discipline, follow your trading plan, and avoid emotional decision-making.
              Keep a trading journal to track your performance and learn from mistakes.
            </p>
          </div>
        </div>
      </div>

      {/* Coming Soon Notice */}
      <div className="bg-blue-600/10 border border-blue-600/30 rounded-lg p-6 text-center">
        <p className="text-blue-400 font-medium">
          Detailed strategy guides with entry/exit rules, risk management, and backtesting results coming soon!
        </p>
      </div>
    </div>
  );
}
