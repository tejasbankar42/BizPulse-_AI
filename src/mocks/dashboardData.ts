import type { KPIData, SalesDataPoint, ProductData, AnomalyAlert, DateRange } from '@/types'

/* ── Helper: generate date range ── */
function generateDates(days: number): string[] {
  const dates: string[] = []
  const end = new Date('2026-09-30')
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(end)
    d.setDate(d.getDate() - i)
    dates.push(d.toISOString().slice(0, 10))
  }
  return dates
}

/* ── Seed-based pseudo-random for deterministic data ── */
function seededRandom(seed: number): () => number {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

/* ── Products ── */
export const PRODUCTS: string[] = [
  'Vada Pav', 'Samosa', 'Masala Chai', 'Cutting Chai', 'Misal Pav',
  'Poha', 'Sabudana Khichdi', 'Thali (Veg)', 'Thali (Non-Veg)', 'Biryani',
  'Paneer Butter Masala', 'Dal Fry', 'Roti', 'Paratha', 'Dosa',
  'Idli', 'Upma', 'Pav Bhaji', 'Chole Bhature', 'Aloo Tikki',
  'Cold Coffee', 'Lassi', 'Nimbu Pani', 'Buttermilk', 'Mango Shake',
  'Paracetamol', 'Crocin', 'Band-Aid', 'ORS Packet', 'Dettol',
  'Notebook', 'Pen', 'Pencil', 'Eraser', 'Sharpener',
  'Maggi', 'Biscuit (Parle-G)', 'Chips (Lays)', 'Chocolate (Dairy Milk)', 'Frooti'
]

const PRODUCT_PRICES: Record<string, number> = {
  'Vada Pav': 20, 'Samosa': 15, 'Masala Chai': 15, 'Cutting Chai': 10, 'Misal Pav': 50,
  'Poha': 30, 'Sabudana Khichdi': 40, 'Thali (Veg)': 100, 'Thali (Non-Veg)': 150, 'Biryani': 120,
  'Paneer Butter Masala': 80, 'Dal Fry': 60, 'Roti': 10, 'Paratha': 30, 'Dosa': 50,
  'Idli': 30, 'Upma': 35, 'Pav Bhaji': 60, 'Chole Bhature': 70, 'Aloo Tikki': 25,
  'Cold Coffee': 50, 'Lassi': 40, 'Nimbu Pani': 20, 'Buttermilk': 15, 'Mango Shake': 60,
  'Paracetamol': 30, 'Crocin': 25, 'Band-Aid': 10, 'ORS Packet': 20, 'Dettol': 55,
  'Notebook': 40, 'Pen': 10, 'Pencil': 5, 'Eraser': 5, 'Sharpener': 10,
  'Maggi': 15, 'Biscuit (Parle-G)': 10, 'Chips (Lays)': 20, 'Chocolate (Dairy Milk)': 40, 'Frooti': 15
}

const PRODUCT_MARGINS: Record<string, number> = {
  'Vada Pav': 0.45, 'Samosa': 0.50, 'Masala Chai': 0.60, 'Cutting Chai': 0.65, 'Misal Pav': 0.35,
  'Poha': 0.55, 'Sabudana Khichdi': 0.40, 'Thali (Veg)': 0.30, 'Thali (Non-Veg)': 0.25, 'Biryani': 0.28,
  'Paneer Butter Masala': 0.32, 'Dal Fry': 0.50, 'Roti': 0.55, 'Paratha': 0.45, 'Dosa': 0.42,
  'Idli': 0.50, 'Upma': 0.52, 'Pav Bhaji': 0.38, 'Chole Bhature': 0.35, 'Aloo Tikki': 0.48,
  'Cold Coffee': 0.55, 'Lassi': 0.50, 'Nimbu Pani': 0.65, 'Buttermilk': 0.60, 'Mango Shake': 0.40,
  'Paracetamol': 0.15, 'Crocin': 0.18, 'Band-Aid': 0.25, 'ORS Packet': 0.20, 'Dettol': 0.12,
  'Notebook': 0.22, 'Pen': 0.30, 'Pencil': 0.35, 'Eraser': 0.40, 'Sharpener': 0.38,
  'Maggi': 0.20, 'Biscuit (Parle-G)': 0.18, 'Chips (Lays)': 0.22, 'Chocolate (Dairy Milk)': 0.15, 'Frooti': 0.20
}

/* ── Generate 6 months of daily sales data ── */
function generateSalesData(): SalesDataPoint[] {
  const rand = seededRandom(42)
  const dates = generateDates(183) // ~6 months
  
  return dates.map((date) => {
    const d = new Date(date)
    const month = d.getMonth()
    const dayOfWeek = d.getDay()
    
    // Base revenue: ₹18,000-25,000
    let baseRevenue = 20000 + rand() * 5000
    
    // Weekend boost (+15%)
    if (dayOfWeek === 0 || dayOfWeek === 6) baseRevenue *= 1.15
    
    // Diwali season (Oct) boost (+40%)
    if (month === 9) baseRevenue *= 1.4
    
    // Monsoon dip (Jul-Aug) (-10%)
    if (month === 6 || month === 7) baseRevenue *= 0.9
    
    // Random daily variance ±10%
    baseRevenue *= (0.9 + rand() * 0.2)
    
    const revenue = Math.round(baseRevenue)
    const orders = Math.round(revenue / 85 + rand() * 20)
    const profit = Math.round(revenue * (0.28 + rand() * 0.08))
    
    return { date, revenue, orders, profit }
  })
}

/* ── Generate product performance data ── */
function generateProductData(): ProductData[] {
  const rand = seededRandom(123)
  
  return PRODUCTS.map((name) => {
    const basePrice = PRODUCT_PRICES[name] || 30
    const margin = PRODUCT_MARGINS[name] || 0.3
    const quantity = Math.round(50 + rand() * 200)
    
    // Cold Coffee anomaly: 30% drop
    const multiplier = name === 'Cold Coffee' ? 0.7 : 1
    const revenue = Math.round(basePrice * quantity * multiplier)
    
    const trendVal = rand()
    const trend: 'up' | 'down' | 'stable' = 
      name === 'Cold Coffee' ? 'down' :
      trendVal > 0.6 ? 'up' : trendVal > 0.3 ? 'stable' : 'down'
    
    return { name, revenue, quantity, margin: Math.round(margin * 100), trend }
  }).sort((a, b) => b.revenue - a.revenue)
}

/* ── KPI data by date range ── */
function generateKPI(range: DateRange): KPIData {
  const multipliers: Record<DateRange, number> = { '7d': 1, '30d': 4.2, '90d': 12.5 }
  const m = multipliers[range]
  
  return {
    revenue: Math.round(168500 * m),
    revenueChange: 12.4,
    profitMargin: 31.2,
    profitMarginChange: -1.8,
    topProduct: 'Masala Chai',
    topProductRevenue: Math.round(24500 * m),
    stockAlerts: 3,
    healthScore: 78,
    timeSaved: '12.5 hrs',
    costPerQuery: 0.03,
  }
}

/* ── Anomaly alerts ── */
const MOCK_ANOMALIES: AnomalyAlert[] = [
  {
    id: 'anom-1',
    product: 'Cold Coffee',
    metric: 'Daily Sales',
    severity: 'high',
    message: 'Cold Coffee sales dropped 30% compared to last month',
    date: '2026-08-15',
    rootCause: 'Monsoon season reduced cold beverage demand. Competitor "CoolSip" opened nearby on Aug 10.',
    expectedValue: 85,
    actualValue: 59,
  },
  {
    id: 'anom-2',
    product: 'Paracetamol',
    metric: 'Stock Level',
    severity: 'medium',
    message: 'Paracetamol stock will run out in 3 days at current rate',
    date: '2026-09-28',
    rootCause: 'Seasonal flu spike increased demand by 45%. Last reorder was delayed by supplier.',
    expectedValue: 150,
    actualValue: 42,
  },
  {
    id: 'anom-3',
    product: 'Biryani',
    metric: 'Profit Margin',
    severity: 'low',
    message: 'Biryani profit margin decreased from 28% to 22%',
    date: '2026-09-20',
    rootCause: 'Chicken price increased ₹40/kg in September. Menu price not updated.',
    expectedValue: 28,
    actualValue: 22,
  },
]

/* ── Export all mock data generators ── */
export const mockDashboardData = {
  '7d': { kpi: generateKPI('7d'), sales: generateSalesData().slice(-7), products: generateProductData(), anomalies: MOCK_ANOMALIES },
  '30d': { kpi: generateKPI('30d'), sales: generateSalesData().slice(-30), products: generateProductData(), anomalies: MOCK_ANOMALIES },
  '90d': { kpi: generateKPI('90d'), sales: generateSalesData().slice(-90), products: generateProductData(), anomalies: MOCK_ANOMALIES },
} as const

export const allSalesData = generateSalesData()
export const allProductData = generateProductData()
export const anomalyAlerts = MOCK_ANOMALIES
