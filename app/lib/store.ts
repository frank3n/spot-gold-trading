import { create } from 'zustand';
import { GoldPrice, PortfolioPosition, PriceAlert } from './types';
import { generateMockGoldPrice, loadFromLocalStorage, saveToLocalStorage } from './utils';

interface AppStore {
  // Gold price state
  goldPrice: GoldPrice;
  updateGoldPrice: () => void;

  // Portfolio state
  positions: PortfolioPosition[];
  addPosition: (position: PortfolioPosition) => void;
  removePosition: (id: string) => void;

  // Alerts state
  alerts: PriceAlert[];
  addAlert: (alert: PriceAlert) => void;
  removeAlert: (id: string) => void;
  toggleAlert: (id: string) => void;
}

export const useStore = create<AppStore>((set, get) => ({
  // Gold price
  goldPrice: generateMockGoldPrice(),

  updateGoldPrice: () => {
    const newPrice = generateMockGoldPrice();
    set({ goldPrice: newPrice });

    // Check if any alerts should trigger
    const { alerts } = get();
    alerts.forEach(alert => {
      if (alert.active && !alert.triggeredAt) {
        const shouldTrigger =
          (alert.condition === '>' && newPrice.price > alert.value) ||
          (alert.condition === '<' && newPrice.price < alert.value);

        if (shouldTrigger) {
          // Send browser notification
          if (typeof window !== 'undefined' && 'Notification' in window) {
            if (Notification.permission === 'granted') {
              new Notification('Price Alert Triggered!', {
                body: `Gold price ${alert.condition} $${alert.value}`,
                icon: '/gold-icon.png',
              });
            }
          }

          // Mark alert as triggered
          set((state) => ({
            alerts: state.alerts.map(a =>
              a.id === alert.id ? { ...a, triggeredAt: new Date() } : a
            ),
          }));
        }
      }
    });
  },

  // Portfolio
  positions: loadFromLocalStorage('positions', []),

  addPosition: (position) => {
    set((state) => {
      const newPositions = [...state.positions, position];
      saveToLocalStorage('positions', newPositions);
      return { positions: newPositions };
    });
  },

  removePosition: (id) => {
    set((state) => {
      const newPositions = state.positions.filter(p => p.id !== id);
      saveToLocalStorage('positions', newPositions);
      return { positions: newPositions };
    });
  },

  // Alerts
  alerts: loadFromLocalStorage('alerts', []),

  addAlert: (alert) => {
    set((state) => {
      const newAlerts = [...state.alerts, alert];
      saveToLocalStorage('alerts', newAlerts);
      return { alerts: newAlerts };
    });
  },

  removeAlert: (id) => {
    set((state) => {
      const newAlerts = state.alerts.filter(a => a.id !== id);
      saveToLocalStorage('alerts', newAlerts);
      return { alerts: newAlerts };
    });
  },

  toggleAlert: (id) => {
    set((state) => {
      const newAlerts = state.alerts.map(a =>
        a.id === id ? { ...a, active: !a.active } : a
      );
      saveToLocalStorage('alerts', newAlerts);
      return { alerts: newAlerts };
    });
  },
}));
