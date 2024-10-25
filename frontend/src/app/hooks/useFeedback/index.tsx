import { ReactNode, useState } from 'react'
import { SuccessModal } from './sub-components/SuccessModal'
import { ErrorModal } from './sub-components/ErrorModal'

export interface RenderFeedbackArgs {
  onClose?: () => void
  title?: string
  message: string
  wait?: boolean
}

export type RenderFeedback = (
  type: 'error' | 'success',
  args: RenderFeedbackArgs,
) => void

export function useFeedback() {
  const [FeedbackElement, setFeedbackElement] = useState<string | ReactNode>('')

  const feedbackTypes = {
    success: SuccessModal,
    error: ErrorModal,
  }

  function renderFeedback(
    type: keyof typeof feedbackTypes,
    { onClose, wait = false, ...otherProps }: RenderFeedbackArgs,
  ) {
    const FeedComponent = feedbackTypes[type]
    if (!wait) {
      setFeedbackElement(
        <FeedComponent
          onClose={() => {
            setFeedbackElement('')
            if (onClose) {
              onClose()
            }
          }}
          {...otherProps}
        />,
      )
    } else {
      setTimeout(() => {
        setFeedbackElement(
          <FeedComponent
            onClose={() => {
              setFeedbackElement('')
              if (onClose) {
                onClose()
              }
            }}
            {...otherProps}
          />,
        )
      }, 125)
    }
  }

  return {
    FeedbackElement,
    renderFeedback,
  }
}
