import { isMockMode, sleep } from '@/lib/utils'
import { mockActions } from '@/mocks/insightsData'
import type { ActionItem } from '@/types'

let localActions = [...mockActions]

export async function getActions(): Promise<ActionItem[]> {
  if (isMockMode()) {
    await sleep(400)
    return [...localActions]
  }
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/actions`)
  if (!res.ok) throw new Error('Failed to fetch actions')
  return res.json()
}

export async function updateActionStatus(
  actionId: string,
  status: 'approved' | 'rejected'
): Promise<ActionItem> {
  if (isMockMode()) {
    await sleep(300)
    const idx = localActions.findIndex((a) => a.id === actionId)
    if (idx === -1) throw new Error('Action not found')
    localActions[idx] = {
      ...localActions[idx],
      status,
      approvedAt: status === 'approved' ? new Date().toISOString() : undefined,
    }
    return localActions[idx]
  }

  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/actions/${actionId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  })
  if (!res.ok) throw new Error('Failed to update action')
  return res.json()
}
