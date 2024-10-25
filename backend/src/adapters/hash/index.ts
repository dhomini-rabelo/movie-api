export abstract class HashModule {
  abstract generate(input: string): string
  abstract compare(input: string, hash: string): boolean
}
