
export type AchievementCondition =
  | 'tips'
  | 'challenge-started'
  | 'challenge-completed'

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  condition: AchievementCondition
  target?: number
}
