import { CircleNotch } from 'phosphor-react'

export function Loading() {
  return (
    <div className="flex items-center justify-center text-black">
      <CircleNotch
        weight="bold"
        className="animate-spin"
        width="1em"
        height="1em"
      />
    </div>
  )
}
