/* ── Shared TypeScript interfaces for BizPulse AI ── */

export type UserRole = 'owner' | 'staff' | 'viewer'

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: UserRole
}

export interface KPIData {
  revenue: number
  revenueChange: number
  profitMargin: number
  profitMarginChange: number
  topProduct: string
  topProductRevenue: number
  stockAlerts: number
  healthScore: number
  timeSaved: string
  costPerQuery: number
}

export interface SalesDataPoint {
  date: string
  revenue: number
  orders: number
  profit: number
}

export interface ProductData {
  name: string
  revenue: number
  quantity: number
  margin: number
  trend: 'up' | 'down' | 'stable'
}

export interface AnomalyAlert {
  id: string
  product: string
  metric: string
  severity: 'high' | 'medium' | 'low'
  message: string
  date: string
  rootCause?: string
  expectedValue: number
  actualValue: number
}

export interface CleaningLogEntry {
  id: string
  type: 'duplicate_removed' | 'missing_filled' | 'format_fixed' | 'outlier_flagged'
  description: string
  rowsAffected: number
  canUndo: boolean
}

export interface UploadFile {
  id: string
  name: string
  type: string
  size: number
  status: 'uploading' | 'ingesting' | 'cleaning' | 'loaded' | 'error'
  progress: number
  cleaningLog?: CleaningLogEntry[]
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  language: 'en' | 'hi' | 'mr'
  timestamp: string
  chart?: ChartData
  table?: TableData
  confidence?: 'high' | 'medium' | 'low'
  sql?: string
  reasoning?: string[]
  sources?: string[]
}

export interface ChartData {
  type: 'line' | 'bar' | 'pie'
  title: string
  data: Record<string, unknown>[]
  xKey: string
  yKeys: string[]
  colors?: string[]
}

export interface TableData {
  headers: string[]
  rows: (string | number)[][]
}

export interface ForecastDataPoint {
  date: string
  actual?: number
  forecast: number
  upperBound: number
  lowerBound: number
  isFestival?: boolean
  festivalName?: string
}

export interface ProfitLeak {
  id: string
  type: 'dead_stock' | 'low_margin' | 'overstock'
  product: string
  impact: number
  description: string
  suggestion: string
}

export interface ActionItem {
  id: string
  type: 'reorder' | 'discount' | 'reminder' | 'price_change'
  title: string
  reason: string
  expectedImpact: string
  confidence: 'high' | 'medium' | 'low'
  status: 'pending' | 'approved' | 'rejected' | 'executed'
  createdAt: string
  approvedAt?: string
  emailDraft?: string
}

export interface EvalQuestion {
  id: number
  question: string
  expectedSQL: string
  generatedSQL: string
  passed: boolean
  latencyMs: number
  category: string
}

export interface AuditLogEntry {
  id: string
  action: string
  user: string
  timestamp: string
  details: string
}

export type DateRange = '7d' | '30d' | '90d'
export type Language = 'en' | 'hi' | 'mr'
