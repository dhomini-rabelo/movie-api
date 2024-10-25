import { randomBytes } from 'node:crypto'

function generateRandomIntegerNumberBetween(start = 1, end = 100): number {
  return Math.floor(Math.random() * (end - start + 1)) + start
}

function generateRandomText(size = 7): string {
  const response = randomBytes(Math.ceil(size / 2)).toString('hex')
  return size % 2 === 0 ? response : response.slice(1)
}

export const some = {
  text: generateRandomText,
  email: (): string => `${generateRandomText()}@${generateRandomText()}.com`,
  integer: generateRandomIntegerNumberBetween,
  boolean: () => {
    const randomBinaryNumber = generateRandomIntegerNumberBetween(0, 1)
    return randomBinaryNumber === 1
  },
  valueBetween: <T>(...values: T[]): T => {
    const randomIndex = generateRandomIntegerNumberBetween(0, values.length - 1)
    return values[randomIndex]
  },
}
