export interface UseCase {
  execute(payload: unknown): Promise<unknown>
}
