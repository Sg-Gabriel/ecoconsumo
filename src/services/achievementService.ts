
import { achievements } from '../data/achievements'

const STORAGE_KEY = 'ecoconsumo-unlocked-achievements'

// Recupera as conquistas desbloqueadas
export function getUnlockedAchievements(): string[] {
  const storedAchievements = localStorage.getItem(STORAGE_KEY)

  if (!storedAchievements) {
    return []
  }

  try {
    const parsedAchievements: unknown = JSON.parse(storedAchievements)

    if (!Array.isArray(parsedAchievements)) {
      return []
    }

    // Mantém somente IDs de conquistas existentes
    return parsedAchievements.filter(
      (id): id is string =>
        typeof id === 'string' &&
        achievements.some((achievement) => achievement.id === id)
    )
  } catch {
    return []
  }
}

// Verifica os critérios e desbloqueia novas conquistas
export function checkAchievements(
  completedTipsCount: number,
  challengeStarted: boolean,
  challengeCompleted: boolean
): string[] {
  const unlockedAchievements = getUnlockedAchievements()

  const newAchievements = achievements
    .filter((achievement) => {
      // Não verifica novamente conquistas já desbloqueadas
      if (unlockedAchievements.includes(achievement.id)) {
        return false
      }

      switch (achievement.condition) {
        case 'tips':
          return completedTipsCount >= (achievement.target ?? 0)

        case 'challenge-started':
          return challengeStarted

        case 'challenge-completed':
          return challengeCompleted

        default:
          return false
      }
    })
    .map((achievement) => achievement.id)

  // Preserva os desbloqueios anteriores
  const updatedAchievements = [
    ...unlockedAchievements,
    ...newAchievements,
  ]

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedAchievements)
  )

  return updatedAchievements
}

// Verifica se uma conquista específica foi desbloqueada
export function isAchievementUnlocked(
  achievementId: string
): boolean {
  const unlockedAchievements = getUnlockedAchievements()

  return unlockedAchievements.includes(achievementId)
}
