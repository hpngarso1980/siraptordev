import { months } from './data'

export const monthOptions = months.map((month, index) => ({
  value: index + 1,
  label: month,
}))
