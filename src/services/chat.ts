import { isMockMode, sleep } from '@/lib/utils'
import { getMockResponse, suggestedQuestions } from '@/mocks/chatData'
import type { ChatMessage, Language } from '@/types'

export async function sendChatMessage(
  question: string,
  language: Language
): Promise<ChatMessage> {
  if (isMockMode()) {
    // Simulate streaming delay
    await sleep(800 + Math.random() * 1200)
    const response = getMockResponse(question)
    response.language = language
    return response
  }

  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question, language }),
  })
  if (!res.ok) throw new Error('Failed to send message')
  return res.json()
}

export function getSuggestedQuestions(language: Language): string[] {
  return suggestedQuestions[language] || suggestedQuestions.en
}
