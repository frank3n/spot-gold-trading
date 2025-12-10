'use client';

import { useState, useEffect } from 'react';
import { useStore } from '@/lib/store';
import { generateId } from '@/lib/utils';
import { Plus, Bell, BellOff, Trash2, CheckCircle } from 'lucide-react';
import type { PriceAlert } from '@/lib/types';

export default function AlertsPage() {
  const { alerts, goldPrice, addAlert, removeAlert, toggleAlert } = useStore();
  const [showAddForm, setShowAddForm] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      return Notification.permission;
    }
    return 'default';
  });

  // Form state
  const [condition, setCondition] = useState<'>' | '<'>('<');
  const [value, setValue] = useState('');

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const requestNotificationPermission = async () => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);
    }
  };

  const handleAddAlert = () => {
    if (!value) return;

    const newAlert: PriceAlert = {
      id: generateId(),
      type: 'price',
      condition,
      value: parseFloat(value),
      active: true,
      createdAt: new Date(),
      notificationMethod: 'browser',
    };

    addAlert(newAlert);

    // Reset form
    setValue('');
    setShowAddForm(false);
  };

  // Separate alerts into active, triggered, and inactive
  const activeAlerts = alerts.filter(a => a.active && !a.triggeredAt);
  const triggeredAlerts = alerts.filter(a => a.triggeredAt);
  const inactiveAlerts = alerts.filter(a => !a.active && !a.triggeredAt);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Price Alerts</h1>
          <p className="text-gray-400 mt-1">Get notified when price reaches your target</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
        >
          <Plus className="w-5 h-5" />
          Create Alert
        </button>
      </div>

      {/* Current Price */}
      <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-sm mb-1">Current Gold Price</p>
            <p className="text-4xl font-bold text-white">
              ${goldPrice.price.toLocaleString()}
            </p>
            <p className={`text-sm mt-1 ${goldPrice.change24h >= 0 ? 'text-green-300' : 'text-red-300'}`}>
              {goldPrice.change24h >= 0 ? '+' : ''}{goldPrice.change24h.toFixed(2)} ({goldPrice.changePercent24h >= 0 ? '+' : ''}{goldPrice.changePercent24h.toFixed(2)}%)
            </p>
          </div>
          {notificationPermission !== 'granted' && (
            <button
              onClick={requestNotificationPermission}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg font-medium transition-colors"
            >
              Enable Notifications
            </button>
          )}
        </div>
      </div>

      {/* Notification Permission Warning */}
      {notificationPermission === 'denied' && (
        <div className="bg-red-600/20 border border-red-600/30 rounded-lg p-4">
          <p className="text-red-400 text-sm">
            Browser notifications are blocked. Please enable them in your browser settings to receive alerts.
          </p>
        </div>
      )}

      {/* Add Alert Form */}
      {showAddForm && (
        <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
          <h2 className="text-xl font-semibold mb-4">Create New Alert</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Alert Condition
              </label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value as '>' | '<')}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              >
                <option value=">">Price goes above</option>
                <option value="<">Price drops below</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Target Price ($)
              </label>
              <input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                placeholder="2100"
                step="0.01"
              />
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleAddAlert}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Create Alert
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

      {/* Active Alerts */}
      {activeAlerts.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <Bell className="w-5 h-5 text-green-400" />
            Active Alerts ({activeAlerts.length})
          </h2>
          <div className="space-y-3">
            {activeAlerts.map((alert) => (
              <div
                key={alert.id}
                className="bg-gray-900 rounded-lg border border-gray-800 p-4 flex items-center justify-between hover:bg-gray-800/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
                    <Bell className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">
                      Alert when price {alert.condition === '>' ? 'goes above' : 'drops below'}
                    </p>
                    <p className="text-2xl font-bold text-white mt-1">
                      ${alert.value.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      Created {mounted ? new Date(alert.createdAt).toLocaleDateString() : '...'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleAlert(alert.id)}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                    title="Disable alert"
                  >
                    <BellOff className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => removeAlert(alert.id)}
                    className="p-2 text-red-400 hover:text-red-300 transition-colors"
                    title="Delete alert"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Triggered Alerts */}
      {triggeredAlerts.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-blue-400" />
            Triggered Alerts ({triggeredAlerts.length})
          </h2>
          <div className="space-y-3">
            {triggeredAlerts.map((alert) => (
              <div
                key={alert.id}
                className="bg-gray-900 rounded-lg border border-blue-800/50 p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">
                      Price {alert.condition === '>' ? 'went above' : 'dropped below'}
                    </p>
                    <p className="text-2xl font-bold text-blue-400 mt-1">
                      ${alert.value.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      Triggered {mounted && alert.triggeredAt ? new Date(alert.triggeredAt).toLocaleString() : '...'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeAlert(alert.id)}
                  className="p-2 text-red-400 hover:text-red-300 transition-colors"
                  title="Delete alert"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Inactive Alerts */}
      {inactiveAlerts.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <BellOff className="w-5 h-5 text-gray-400" />
            Inactive Alerts ({inactiveAlerts.length})
          </h2>
          <div className="space-y-3">
            {inactiveAlerts.map((alert) => (
              <div
                key={alert.id}
                className="bg-gray-900 rounded-lg border border-gray-800 p-4 flex items-center justify-between opacity-60"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
                    <BellOff className="w-6 h-6 text-gray-500" />
                  </div>
                  <div>
                    <p className="text-gray-400 font-medium">
                      Alert when price {alert.condition === '>' ? 'goes above' : 'drops below'}
                    </p>
                    <p className="text-2xl font-bold text-gray-500 mt-1">
                      ${alert.value.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleAlert(alert.id)}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                    title="Enable alert"
                  >
                    <Bell className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => removeAlert(alert.id)}
                    className="p-2 text-red-400 hover:text-red-300 transition-colors"
                    title="Delete alert"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {alerts.length === 0 && (
        <div className="bg-gray-900 rounded-lg border border-gray-800 p-12 text-center">
          <Bell className="w-16 h-16 text-gray-700 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">No alerts configured yet</p>
          <p className="text-gray-500 text-sm mt-2">
            Click &quot;Create Alert&quot; to get notified when gold price reaches your target
          </p>
        </div>
      )}
    </div>
  );
}
