export interface HashModule {
  generate(input: string): string
  compare(input: string, hash: string): boolean
}
