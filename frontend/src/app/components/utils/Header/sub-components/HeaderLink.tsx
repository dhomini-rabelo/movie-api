import { Text } from '../../../../components/common/Text'
import { Div } from './styles'

export function HeaderLink({ children }: { children: React.ReactNode }) {
  return (
    <Div.Link className="rounded-lg bg-Black-300 py-2 px-4 flex items-center gap-x-2 border-2">
      <Text weight="regular">{children}</Text>
    </Div.Link>
  )
}
