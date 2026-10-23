import { create } from 'zustand'
import type { User, UserRole, Language, DateRange } from '@/types'

/* ── Auth Slice ── */
interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (role: UserRole) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (role: UserRole) =>
    set({
      isAuthenticated: true,
      user: {
        id: 'mock-user-1',
        name: role === 'owner' ? 'Rajesh Sharma' : role === 'staff' ? 'Priya Patel' : 'Amit Verma',
        email: `${role}@annapurna.demo`,
        role,
        avatar: undefined,
      },
    }),
  logout: () => set({ user: null, isAuthenticated: false }),
}))

/* ── App Settings Slice ── */
interface AppState {
  language: Language
  dateRange: DateRange
  sidebarOpen: boolean
  commandPaletteOpen: boolean
  dataMaskingEnabled: boolean
  setLanguage: (lang: Language) => void
  setDateRange: (range: DateRange) => void
  toggleSidebar: () => void
  toggleCommandPalette: () => void
  setDataMasking: (enabled: boolean) => void
}

export const useAppStore = create<AppState>((set) => ({
  language: 'en',
  dateRange: '30d',
  sidebarOpen: true,
  commandPaletteOpen: false,
  dataMaskingEnabled: false,
  setLanguage: (language) => set({ language }),
  setDateRange: (dateRange) => set({ dateRange }),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  toggleCommandPalette: () => set((s) => ({ commandPaletteOpen: !s.commandPaletteOpen })),
  setDataMasking: (dataMaskingEnabled) => set({ dataMaskingEnabled }),
}))

/* ── Toast Notification Slice ── */
export interface Toast {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  description?: string
}

interface ToastState {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  addToast: (toast) =>
    set((s) => ({
      toasts: [
        ...s.toasts,
        { ...toast, id: `toast-${Date.now()}-${Math.random().toString(36).slice(2)}` },
      ],
    })),
  removeToast: (id) =>
    set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}))
