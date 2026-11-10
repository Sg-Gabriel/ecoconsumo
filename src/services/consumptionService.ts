
import type { Consumption } from '../types/Consumption'

const STORAGE_KEY = 'ecoconsumo-consumptions'

export function getConsumptions(): Consumption[] {
  const storedData = localStorage.getItem(STORAGE_KEY)

  if (!storedData) {
    return []
  }

  try {
    return JSON.parse(storedData) as Consumption[]
  } catch {
    return []
  }
}

export function saveConsumptions(
  consumptions: Consumption[],
): void {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(consumptions),
  )
}

export function addConsumption(
  consumption: Consumption,
): void {
  const consumptions = getConsumptions()

  const alreadyExists = consumptions.some(
    (item) => item.month === consumption.month,
  )

  if (alreadyExists) {
    throw new Error('Já existe um registro para esse mês.')
  }

  consumptions.push(consumption)
  saveConsumptions(consumptions)
}

export function updateConsumption(
  updatedConsumption: Consumption,
): void {
  const consumptions = getConsumptions()

  const updatedList = consumptions.map((item) =>
    item.id === updatedConsumption.id
      ? updatedConsumption
      : item,
  )

  saveConsumptions(updatedList)
}

export function deleteConsumption(id: string): void {
  const consumptions = getConsumptions()

  const updatedList = consumptions.filter(
    (item) => item.id !== id,
  )

  saveConsumptions(updatedList)
}
