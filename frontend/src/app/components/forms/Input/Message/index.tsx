import { XCircle } from 'phosphor-react'
import { colors } from '../../../../tokens/colors'
import { Text } from '../../../common/Text'

export function InputMessage({ children }: { children?: string }) {
  return children ? (
    <div className="flex items-center gap-x-1">
      <XCircle size={16} color={colors['Red-400']} />
      <Text color="Red-400" size="sm" weight="regular">
        {children}
      </Text>
    </div>
  ) : (
    <></>
  )
}
