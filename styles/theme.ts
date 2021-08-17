import { randomItemFromArray } from '@lib/utils'

export const colors = [
  '#d888ec',
  '#c098fa',
  '#a8a6ff',
  '#93b2ff',
  '#83bcff',
  '#7cc4fd',
  '#7ecbf5',
  '#88d0ec',
]

const reversedColors = () => {
  const reversed = [...colors.reverse()]
  colors.reverse()
  return reversed
}

export const getRandomColor = (prevColor?: string): string => {
  const newColor = randomItemFromArray(colors)
  return newColor === prevColor ? getRandomColor(prevColor) : newColor
}

export const gradientWithLoop = [...colors, ...reversedColors().slice(1)].join(
  ','
)
