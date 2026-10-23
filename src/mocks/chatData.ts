import type { ChatMessage } from '@/types'

export const suggestedQuestions = {
  en: [
    "What was yesterday's total revenue?",
    "Which product has the highest profit margin?",
    "Show me the sales trend for Vada Pav",
    "Why did Cold Coffee sales drop last month?",
    "What's the forecast for next week?",
    "Which items are running low on stock?",
  ],
  hi: [
    "कल की कुल आय कितनी थी?",
    "किस उत्पाद का सबसे ज़्यादा लाभ मार्जिन है?",
    "वड़ा पाव की बिक्री रुझान दिखाएं",
    "कोल्ड कॉफ़ी की बिक्री पिछले महीने क्यों गिरी?",
    "अगले हफ़्ते का पूर्वानुमान क्या है?",
    "किन चीज़ों का स्टॉक कम है?",
  ],
  mr: [
    "कालची एकूण कमाई किती होती?",
    "कोणत्या उत्पादनाचा सर्वाधिक नफा मार्जिन आहे?",
    "वडा पावच्या विक्रीचा ट्रेंड दाखवा",
    "कोल्ड कॉफीची विक्री गेल्या महिन्यात का घटली?",
    "पुढच्या आठवड्याचा अंदाज काय आहे?",
    "कोणत्या वस्तूंचा स्टॉक कमी आहे?",
  ],
}

export const mockChatResponses: Record<string, ChatMessage> = {
  "What was yesterday's total revenue?": {
    id: 'resp-1',
    role: 'assistant',
    content: "Yesterday's total revenue was **₹24,350**. This is 8.2% higher than the same day last week (₹22,500). The increase was mainly driven by strong Thali and Biryani sales during the lunch rush.",
    language: 'en',
    timestamp: new Date().toISOString(),
    confidence: 'high',
    chart: {
      type: 'bar',
      title: "Yesterday's Revenue by Category",
      data: [
        { category: 'Food', revenue: 16800 },
        { category: 'Beverages', revenue: 4200 },
        { category: 'Pharmacy', revenue: 1850 },
        { category: 'General', revenue: 1500 },
      ],
      xKey: 'category',
      yKeys: ['revenue'],
    },
    sql: "SELECT category, SUM(amount) as revenue FROM sales WHERE date = '2026-09-29' GROUP BY category ORDER BY revenue DESC",
    reasoning: [
      "Identified the query as a date-filtered aggregation on the sales table",
      "Used yesterday's date (2026-09-29) as the filter",
      "Grouped by product category for the breakdown chart",
      "Compared with same weekday last week for context",
    ],
    sources: ['sales', 'products'],
  },
  "Which product has the highest profit margin?": {
    id: 'resp-2',
    role: 'assistant',
    content: "**Cutting Chai** has the highest profit margin at **65%**. It costs just ₹3.50 to make but sells for ₹10. Other high-margin items: Nimbu Pani (65%), Masala Chai (60%), and Buttermilk (60%).",
    language: 'en',
    timestamp: new Date().toISOString(),
    confidence: 'high',
    table: {
      headers: ['Product', 'Selling Price', 'Cost', 'Margin %'],
      rows: [
        ['Cutting Chai', '₹10', '₹3.50', '65%'],
        ['Nimbu Pani', '₹20', '₹7', '65%'],
        ['Masala Chai', '₹15', '₹6', '60%'],
        ['Buttermilk', '₹15', '₹6', '60%'],
        ['Poha', '₹30', '₹13.50', '55%'],
      ],
    },
    sql: "SELECT product_name, price, cost, ROUND((price - cost) / price * 100, 1) as margin_pct FROM products ORDER BY margin_pct DESC LIMIT 5",
    reasoning: [
      "Query requests ranking by margin which is (price - cost) / price",
      "Pulled product cost data from products table",
      "Sorted descending by margin percentage",
      "Limited to top 5 for concise response",
    ],
    sources: ['products'],
  },
  "Why did Cold Coffee sales drop last month?": {
    id: 'resp-3',
    role: 'assistant',
    content: "Cold Coffee sales dropped **30% in August** (from ~85 units/day to ~59 units/day). Two key factors:\n\n1. **Monsoon season** — cold beverage demand naturally drops 15-20% during heavy rains\n2. **New competitor** — \"CoolSip\" cafe opened 200m away on Aug 10, capturing ~15% of cold beverage customers\n\n💡 **Suggestion:** Consider a monsoon-special combo (Cold Coffee + Samosa at ₹55) to recover demand.",
    language: 'en',
    timestamp: new Date().toISOString(),
    confidence: 'medium',
    chart: {
      type: 'line',
      title: 'Cold Coffee Daily Sales (Jul-Sep)',
      data: Array.from({ length: 90 }, (_, i) => {
        const date = new Date('2026-07-01')
        date.setDate(date.getDate() + i)
        const isAugOnward = date.getMonth() >= 7
        const base = isAugOnward ? 59 : 85
        const variance = Math.sin(i * 0.5) * 8 + (Math.random() - 0.5) * 10
        return {
          date: date.toISOString().slice(0, 10),
          units: Math.round(base + variance),
        }
      }),
      xKey: 'date',
      yKeys: ['units'],
    },
    sql: "SELECT date, SUM(quantity) as units FROM sales WHERE product_name = 'Cold Coffee' AND date BETWEEN '2026-07-01' AND '2026-09-30' GROUP BY date ORDER BY date",
    reasoning: [
      "Identified this as a root-cause analysis query, not just data retrieval",
      "Pulled daily sales data for Cold Coffee over 3 months",
      "Detected the drop point around Aug 10 using change-point detection",
      "Cross-referenced with external events (competitor opening, weather data)",
      "Generated actionable suggestion based on the analysis",
    ],
    sources: ['sales', 'products', 'external_events'],
  },
}

export function getMockResponse(question: string): ChatMessage {
  // Try exact match first
  if (mockChatResponses[question]) {
    return { ...mockChatResponses[question], id: `resp-${Date.now()}` }
  }

  // Try partial match
  const lowerQ = question.toLowerCase()
  for (const [key, value] of Object.entries(mockChatResponses)) {
    if (lowerQ.includes(key.toLowerCase().split(' ').slice(0, 3).join(' '))) {
      return { ...value, id: `resp-${Date.now()}` }
    }
  }

  // Default response
  return {
    id: `resp-${Date.now()}`,
    role: 'assistant',
    content: `Great question! Based on your data from Annapurna Canteen:\n\nYour business has been performing well with a **31.2% average profit margin** across 40 products. Revenue has grown 12.4% compared to last quarter.\n\nThe main areas to watch are:\n- **Cold Coffee** sales dropping (investigate further)\n- **Paracetamol** stock running low\n- **Biryani** margins declining due to cost increases\n\nWould you like me to dive deeper into any of these areas?`,
    language: 'en',
    timestamp: new Date().toISOString(),
    confidence: 'medium',
    reasoning: [
      "No exact query match found — provided a general business summary",
      "Pulled key metrics from dashboard aggregations",
      "Highlighted top anomalies for follow-up",
    ],
    sources: ['sales', 'products'],
  }
}
