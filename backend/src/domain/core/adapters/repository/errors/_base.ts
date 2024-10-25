export abstract class DatabaseError extends Error {
  abstract readonly type: string
}
