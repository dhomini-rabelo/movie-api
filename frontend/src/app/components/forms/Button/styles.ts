import styled from 'styled-components'

export type ButtonVariant = 'default' | 'error'
export type ButtonSize = 'sm' | 'md'

export const ButtonStyle = styled.button<{
  variant: ButtonVariant
  size: ButtonSize
}>`
  padding: ${({ size }) => (size === 'sm' ? '0.5rem 1rem' : '0.75rem 1.5rem')};
  text-align: center;
  border-radius: 0.5rem;
  background: ${({ variant }) =>
    variant === 'error' ? 'var(--Red-500)' : 'var(--Green-300)'};
  color: var(--Black-200);
  width: 100%;

  &:hover {
    background: ${({ variant }) =>
      variant === 'error' ? 'var(--Red-600)' : 'var(--Green-400)'};
  }
`
