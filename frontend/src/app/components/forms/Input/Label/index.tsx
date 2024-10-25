import { Text } from '../../../common/Text'

interface InputLabelProps {
  children: string | React.ReactNode
  inputId?: string
}

export function InputLabel({ children, inputId }: InputLabelProps) {
  return (
    <label htmlFor={inputId}>
      <Text variant="text">{children}</Text>
    </label>
  )
}
