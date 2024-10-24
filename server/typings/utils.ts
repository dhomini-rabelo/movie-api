export type AnyRecord = Record<string, any>

export type OverWrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
