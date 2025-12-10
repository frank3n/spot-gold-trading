'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Calculator,
  Briefcase,
  Bell,
  TrendingUp,
  Settings,
  Home
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Trading Tools', href: '/tools', icon: Calculator },
  { name: 'Portfolio', href: '/portfolio', icon: Briefcase },
  { name: 'Price Alerts', href: '/alerts', icon: Bell },
  { name: 'Strategies', href: '/strategies', icon: TrendingUp },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-gray-900 border-r border-gray-800">
      <nav className="h-full flex flex-col p-4">
        <div className="space-y-1 flex-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors
                  ${isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-gray-800">
          <div className="px-4 py-3">
            <p className="text-xs text-gray-500">
              Spot Gold Trading Platform
            </p>
            <p className="text-xs text-gray-600 mt-1">
              v1.0.0 MVP
            </p>
          </div>
        </div>
      </nav>
    </aside>
  );
}
