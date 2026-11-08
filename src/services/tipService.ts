
import type { TipProgress } from '../types/TipProgress'

const STORAGE_KEY = 'ecoconsumo-completed-tips'

// Recupera as dicas concluídas
export function getCompletedTips(): TipProgress[] {
  const storedTips = localStorage.getItem(STORAGE_KEY)

  if (!storedTips) {
    return []
  }

  try {
    const parsedTips: unknown = JSON.parse(storedTips)

    if (!Array.isArray(parsedTips)) {
      return []
    }

    return parsedTips.filter(
      (item): item is TipProgress =>
        typeof item === 'object' &&
        item !== null &&
        typeof item.tipId === 'string' &&
        typeof item.completedAt === 'string'
    )
  } catch {
    return []
  }
}

// Marca uma dica como concluída
export function completeTip(tipId: string): void {
  const completedTips = getCompletedTips()

  // Evita registrar a mesma dica mais de uma vez
  const alreadyCompleted = completedTips.some(
    (tip) => tip.tipId === tipId
  )

  if (alreadyCompleted) {
    return
  }

  const newProgress: TipProgress = {
    tipId,
    completedAt: new Date().toISOString(),
  }

  const updatedTips = [...completedTips, newProgress]

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTips))
}

// Remove uma dica da lista de concluídas
export function uncompleteTip(tipId: string): void {
  const completedTips = getCompletedTips()

  const updatedTips = completedTips.filter(
    (tip) => tip.tipId !== tipId
  )

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTips))
}

// Verifica se uma dica já foi concluída
export function isTipCompleted(tipId: string): boolean {
  const completedTips = getCompletedTips()

  return completedTips.some(
    (tip) => tip.tipId === tipId
  )
}
