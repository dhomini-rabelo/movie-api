import { Select as SelectComponent } from './style'
import { forwardRef } from 'react'

type SelectBoxProps = React.InputHTMLAttributes<HTMLSelectElement> & {
  options: {
    display: string
    value: string
  }[]
}

export const Select = forwardRef<HTMLSelectElement, SelectBoxProps>(
  ({ options, ...props }, ref) => {
    return (
      <>
        <SelectComponent.Box ref={ref} {...props}>
          <option value="">Select an option</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.display}
            </option>
          ))}
        </SelectComponent.Box>
      </>
    )
  },
)
