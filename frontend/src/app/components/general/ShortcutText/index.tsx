import { PushPin } from 'phosphor-react'
import { ShortcutEntity } from '../../../../code/entities'
import { Text } from '../../../components/common/Text'
import { useState } from 'react'
import { client, queryClient } from '../../../../code/settings'
import { useFeedback } from '../../../hooks/useFeedback'

type ShortcutTextProps = {
  shortcut: ShortcutEntity
  onClick: () => void
}

export function ShortcutText({ shortcut, onClick }: ShortcutTextProps) {
  const { FeedbackElement, renderFeedback } = useFeedback()
  const [updatingData, setUpdatingData] = useState<boolean>(false)

  async function togglePin() {
    setUpdatingData(true)
    try {
      await client.put(`/shortcuts/pin/${shortcut.id}`)
      queryClient.invalidateQueries({
        queryKey: ['shortcuts-from-folder'],
      })
      renderFeedback('success', {
        message: 'Successfully!',
      })
    } catch (error) {
      renderFeedback('error', {
        message: 'An error occurred!',
      })
    } finally {
      setUpdatingData(false)
    }
  }

  return (
    <>
      {FeedbackElement}
      <div
        className="folder bg-Black-100 rounded-2xl px-4 py-5 border-2 border-transparent hover:border-Gray-500 cursor-pointer relative"
        key={shortcut.id}
      >
        <main onClick={onClick}>
          <Text>{shortcut.text}</Text>
        </main>
        <div className="absolute top-4 right-4 flex items-center gap-x-0.5">
          <button disabled={updatingData} onClick={togglePin}>
            <PushPin
              size={24}
              weight={shortcut.is_pinned ? 'fill' : 'regular'}
              className="text-Gray-700 hover:text-Gray-500 relative -top-0.5"
            />
          </button>
        </div>
      </div>
    </>
  )
}
