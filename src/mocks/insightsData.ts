import type { ForecastDataPoint, ProfitLeak, ActionItem } from '@/types'

/* ── Forecast Data (next 30 days with confidence bands) ── */
function generateForecast(): ForecastDataPoint[] {
  const data: ForecastDataPoint[] = []
  const startDate = new Date('2026-09-01')

  // Historical actuals (30 days)
  for (let i = 0; i < 30; i++) {
    const d = new Date(startDate)
    d.setDate(d.getDate() + i)
    const base = 22000 + Math.sin(i * 0.3) * 3000 + (Math.random() - 0.5) * 2000
    const actual = Math.round(base)
    data.push({
      date: d.toISOString().slice(0, 10),
      actual,
      forecast: actual,
      upperBound: Math.round(actual * 1.1),
      lowerBound: Math.round(actual * 0.9),
    })
  }

  // Forecast (next 30 days)
  for (let i = 30; i < 60; i++) {
    const d = new Date(startDate)
    d.setDate(d.getDate() + i)
    const base = 23000 + Math.sin(i * 0.3) * 3500

    // Diwali spike around Oct 20-25
    const dayOfMonth = d.getDate()
    const month = d.getMonth()
    const isDiwali = month === 9 && dayOfMonth >= 18 && dayOfMonth <= 25
    const diwaliMultiplier = isDiwali ? 1.45 : 1

    const forecast = Math.round(base * diwaliMultiplier)
    const spread = i > 45 ? 0.2 : 0.12 // wider bands further out

    data.push({
      date: d.toISOString().slice(0, 10),
      forecast,
      upperBound: Math.round(forecast * (1 + spread)),
      lowerBound: Math.round(forecast * (1 - spread)),
      isFestival: isDiwali,
      festivalName: isDiwali ? 'Diwali' : undefined,
    })
  }

  return data
}

/* ── Profit Leaks ── */
export const mockProfitLeaks: ProfitLeak[] = [
  {
    id: 'leak-1',
    type: 'dead_stock',
    product: 'Sharpener',
    impact: 2400,
    description: 'Only 3 units sold in the last 30 days. ₹2,400 worth of inventory sitting idle.',
    suggestion: 'Run a clearance bundle: Notebook + Pen + Sharpener at ₹45 (saves ₹10). Or discontinue and free up shelf space.',
  },
  {
    id: 'leak-2',
    type: 'low_margin',
    product: 'Dettol',
    impact: 4800,
    description: 'Dettol has only a 12% margin — the lowest in your inventory. You sold ₹40,000 worth but earned just ₹4,800.',
    suggestion: 'Negotiate bulk pricing with supplier. Or switch to a private-label antiseptic with 25%+ margin.',
  },
  {
    id: 'leak-3',
    type: 'low_margin',
    product: 'Chocolate (Dairy Milk)',
    impact: 3600,
    description: 'Dairy Milk margin is only 15%. High volume (180 units/month) but low profit contribution.',
    suggestion: 'This is a traffic driver — keep it but place high-margin items (Chai, Samosa) near the checkout for impulse purchases.',
  },
  {
    id: 'leak-4',
    type: 'overstock',
    product: 'Eraser',
    impact: 1200,
    description: 'You have 500 erasers in stock — a 5-month supply at current sales rate.',
    suggestion: 'Don\'t reorder until stock drops below 100. Offer bulk pack of 10 at ₹40 to schools nearby.',
  },
  {
    id: 'leak-5',
    type: 'dead_stock',
    product: 'Pencil',
    impact: 800,
    description: 'Pencil sales dropped 60% since June. Digital shift in local schools reducing demand.',
    suggestion: 'Phase out gradually. Replace shelf space with phone accessories — higher margin and growing demand.',
  },
]

/* ── Recommended Actions ── */
export const mockActions: ActionItem[] = [
  {
    id: 'action-1',
    type: 'reorder',
    title: 'Reorder Paracetamol — Stock Critical',
    reason: 'Current stock: 42 units. At current sell rate (15/day), stock will run out in 3 days. Seasonal flu is driving 45% higher demand.',
    expectedImpact: 'Prevents ₹4,500/week revenue loss from stockout',
    confidence: 'high',
    status: 'pending',
    createdAt: '2026-09-28T10:30:00',
    emailDraft: `Subject: Urgent Reorder — Paracetamol 500mg\n\nDear Supplier,\n\nPlease process an urgent order for:\n- Paracetamol 500mg Strip × 200 units\n\nCurrent stock is critically low (42 units remaining). Please confirm delivery by Sep 30.\n\nRegards,\nAnnapurna Canteen`,
  },
  {
    id: 'action-2',
    type: 'discount',
    title: 'Run Cold Coffee Combo Offer',
    reason: 'Cold Coffee sales are down 30%. A combo with Samosa at ₹55 (save ₹10) could recover 15-20% of lost sales.',
    expectedImpact: 'Estimated ₹2,100/week additional revenue',
    confidence: 'medium',
    status: 'pending',
    createdAt: '2026-09-27T14:00:00',
  },
  {
    id: 'action-3',
    type: 'price_change',
    title: 'Increase Biryani Price by ₹10',
    reason: 'Chicken prices increased ₹40/kg. Current margin dropped from 28% to 22%. A ₹10 price increase restores margin to 26%.',
    expectedImpact: 'Restores ₹3,200/month in profit with <5% expected volume drop',
    confidence: 'high',
    status: 'pending',
    createdAt: '2026-09-26T09:15:00',
  },
  {
    id: 'action-4',
    type: 'reminder',
    title: 'Send Payment Reminder to Supplier',
    reason: 'Outstanding payment of ₹12,500 from "Fresh Dairy" for bulk curd order (Invoice #FD-2026-089). Due date: Sep 25, now 5 days overdue.',
    expectedImpact: 'Recover ₹12,500 in receivables',
    confidence: 'high',
    status: 'pending',
    createdAt: '2026-09-30T08:00:00',
    emailDraft: `Subject: Payment Reminder — Invoice #FD-2026-089\n\nDear Fresh Dairy Team,\n\nThis is a friendly reminder regarding the outstanding payment of ₹12,500 for Invoice #FD-2026-089 (Bulk Curd Order, dated Sep 15).\n\nThe payment was due on September 25. Kindly process the payment at your earliest convenience.\n\nThank you,\nAnnapurna Canteen`,
  },
  {
    id: 'action-5',
    type: 'reorder',
    title: 'Stock Up for Diwali Rush',
    reason: 'Diwali is in 3 weeks. Historical data shows 40% sales spike. Current inventory won\'t cover the demand for Sweets, Chai, and Snacks.',
    expectedImpact: 'Prevent estimated ₹35,000 in missed sales during Diwali week',
    confidence: 'medium',
    status: 'pending',
    createdAt: '2026-09-25T11:00:00',
  },
]

export const mockForecastData = generateForecast()
