import { Div } from './style'
import { forwardRef } from 'react'

type InputBoxProps = React.InputHTMLAttributes<
  HTMLInputElement | HTMLTextAreaElement
> & {
  type?: 'text' | 'password' | 'text-area'
  RightIcon?: React.ReactNode
}

export const InputBox = forwardRef<
  HTMLTextAreaElement | HTMLInputElement,
  InputBoxProps
>(({ type = 'text', spellCheck = false, RightIcon, ...inputProps }, ref) => {
  return (
    <Div.InputBox>
      {type === 'text-area' ? (
        <textarea
          ref={ref as React.Ref<HTMLTextAreaElement>}
          spellCheck={spellCheck}
          {...inputProps}
        ></textarea>
      ) : (
        <input
          ref={ref as React.Ref<HTMLInputElement>}
          type={type}
          spellCheck={spellCheck}
          {...inputProps}
        />
      )}
      {RightIcon}
    </Div.InputBox>
  )
})
