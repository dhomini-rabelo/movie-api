// Application
import { Span, TextStyledProps } from './styles'

export type TextProps = Partial<TextStyledProps> & {
  children: React.ReactNode
  className?: string
}

export function Text({
  color = 'White',
  className,
  children,
  size,
  variant = 'text',
  weight,
}: TextProps) {
  return (
    <Span.Text
      color={color}
      variant={variant}
      size={size || (variant === 'title' ? 'lg' : 'md')}
      weight={weight || (variant === 'title' ? 'bold' : 'medium')}
      className={className || ''}
    >
      {children}
    </Span.Text>
  )
}
