import { ButtonSize, ButtonStyle, ButtonVariant } from './styles'
import { Text } from '../../common/Text'
import { Loading } from '../Loading'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
  type?: 'submit' | 'reset' | 'button'
  size?: ButtonSize
  variant?: ButtonVariant
  isSubmitting?: boolean
}

export function Button({
  children,
  type = 'button',
  size = 'md',
  variant = 'default',
  isSubmitting = false,
  ...props
}: ButtonProps) {
  return (
    <ButtonStyle
      type={type}
      size={size}
      variant={variant}
      disabled={isSubmitting}
      {...props}
      className="flex items-center justify-center"
    >
      <Text color="Black-300" weight="bold">
        {isSubmitting ? <Loading /> : children}
      </Text>
    </ButtonStyle>
  )
}
