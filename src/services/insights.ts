import { isMockMode, sleep } from '@/lib/utils'
import { mockForecastData, mockProfitLeaks } from '@/mocks/insightsData'
import { anomalyAlerts } from '@/mocks/dashboardData'
import type { ForecastDataPoint, AnomalyAlert, ProfitLeak } from '@/types'

export async function getForecastData(): Promise<ForecastDataPoint[]> {
  if (isMockMode()) {
    await sleep(700)
    return mockForecastData
  }
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/insights/forecast`)
  if (!res.ok) throw new Error('Failed to fetch forecast')
  return res.json()
}

export async function getAnomalies(): Promise<AnomalyAlert[]> {
  if (isMockMode()) {
    await sleep(500)
    return anomalyAlerts
  }
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/insights/anomalies`)
  if (!res.ok) throw new Error('Failed to fetch anomalies')
  return res.json()
}

export async function getProfitLeaks(): Promise<ProfitLeak[]> {
  if (isMockMode()) {
    await sleep(600)
    return mockProfitLeaks
  }
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/insights/profit-leaks`)
  if (!res.ok) throw new Error('Failed to fetch profit leaks')
  return res.json()
}
