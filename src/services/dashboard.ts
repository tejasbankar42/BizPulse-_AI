import { isMockMode, sleep } from '@/lib/utils'
import { mockDashboardData } from '@/mocks/dashboardData'
import type { KPIData, SalesDataPoint, ProductData, AnomalyAlert, DateRange } from '@/types'

interface DashboardResponse {
  kpi: KPIData
  sales: SalesDataPoint[]
  products: ProductData[]
  anomalies: AnomalyAlert[]
}

export async function getDashboardData(range: DateRange): Promise<DashboardResponse> {
  if (isMockMode()) {
    // Simulate network delay for realistic UX
    await sleep(600 + Math.random() * 400)
    return mockDashboardData[range]
  }

  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/dashboard?range=${range}`)
  if (!res.ok) throw new Error('Failed to fetch dashboard data')
  return res.json()
}
