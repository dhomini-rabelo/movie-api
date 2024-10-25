import {
  CopySimple,
  LockLaminated,
  LockSimpleOpen,
  PencilSimple,
  Plus,
} from 'phosphor-react'
import { Text } from '../../../components/common/Text'
import { FolderModal } from './sub-components/FolderModal'
import { useModals } from '../../../hooks/useModal'
import { FolderEntity, ShortcutEntity } from '../../../../code/entities'
import { client, queryClient } from '../../../../code/settings'
import { useFeedback } from '../../../hooks/useFeedback'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShortcutModal } from './sub-components/ShortcutModal '

export interface FolderData extends FolderEntity {
  shortcuts: ShortcutEntity[]
}

export function Folder({
  editable = false,
  folder,
}: {
  folder: FolderData
  editable?: boolean
}) {
  const { FeedbackElement, renderFeedback } = useFeedback()
  const [updatingData, setUpdatingData] = useState<boolean>(false)
  const [shortcutToEdit, setShortcutToEdit] = useState<ShortcutEntity | null>(
    null,
  )
  const { currentActiveModal, activateModal, disableModal } = useModals<
    'folder-modal' | 'shortcut-modal'
  >()
  const emptyShortcutSpaces =
    folder.shortcuts.length < 3 ? 3 - folder.shortcuts.length : 0

  async function toggleVisibility() {
    setUpdatingData(true)
    try {
      await client.put(`/folders/visibility/${folder.id}`)
      renderFeedback('success', {
        message: 'Successfully!',
        onClose: () => {
          queryClient.invalidateQueries({
            queryKey: ['my-folders'],
          })
        },
      })
    } catch (error) {
      renderFeedback('error', {
        message: 'An error occurred!',
      })
    } finally {
      setUpdatingData(false)
    }
  }

  function openShortcutModal(shortcut: ShortcutEntity) {
    setShortcutToEdit(shortcut)
    activateModal('shortcut-modal')
  }

  return (
    <>
      {FeedbackElement}
      {currentActiveModal === 'folder-modal' && (
        <FolderModal onClose={disableModal} editData={folder} />
      )}
      {shortcutToEdit && currentActiveModal === 'shortcut-modal' && (
        <ShortcutModal
          onClose={disableModal}
          shortcutData={shortcutToEdit}
          mode={editable ? 'edit' : 'read'}
        />
      )}
      <div className="folder bg-Black-100 rounded-2xl px-4 py-5 border-2 border-transparent hover:border-Gray-500 cursor-pointer relative">
        <Link to={`/folders/${folder.id}`}>
          <strong className="flex items-center justify-center gap-x-1.5">
            <img src="/icons/folder.svg" className="h-7 w-7" />
            <Text variant="title" size="md">
              {folder.name}
            </Text>
          </strong>
          <div className="mt-0.5 text-center">
            <Text size="sm" weight="regular" color="Gray-700">
              {folder.description}
            </Text>
          </div>
        </Link>
        <main className="mt-2.5 flex flex-col gap-y-2">
          {folder.shortcuts.map((shortcut) => (
            <div className="group" key={shortcut.id}>
              <div
                className="bg-Black-300 hover:bg-Black-400 rounded-lg px-4 py-2 text-White-300 group-hover:text-white"
                onClick={() => openShortcutModal(shortcut)}
              >
                <div className="flex justify-between items-center">
                  <Text weight="regular" color={null}>
                    {shortcut.text}
                  </Text>
                  <span className="hidden group-hover:inline-block">
                    <CopySimple
                      size={24}
                      weight="fill"
                      className="inline-block text-White-300"
                    />
                  </span>
                </div>
              </div>
            </div>
          ))}
          {Array.from({ length: emptyShortcutSpaces }).map((_, index) => (
            <div
              key={index}
              className="bg-Black-300 rounded-lg px-4 py-2 text-White-300"
            >
              <Text weight="regular" color={null}>
                Empty ({index})
              </Text>
            </div>
          ))}
        </main>
        <div className="absolute top-4 right-4 flex items-center gap-x-0.5">
          {editable && (
            <>
              <Link to={`/folders/${folder.id}`}>
                <Plus
                  weight="bold"
                  size={24}
                  className="text-Gray-700 hover:text-Gray-500 relative -top-0.5"
                  onClick={() => activateModal('folder-modal')}
                />
              </Link>
              <PencilSimple
                size={24}
                className="text-Gray-700 hover:text-Gray-500 relative -top-0.5"
                onClick={() => activateModal('folder-modal')}
              />
              <button disabled={updatingData} onClick={toggleVisibility}>
                {folder.is_private ? (
                  <LockLaminated
                    size={24}
                    className="text-Gray-700 hover:text-Gray-500"
                  />
                ) : (
                  <LockSimpleOpen
                    size={24}
                    className="text-Gray-700 hover:text-Gray-500"
                  />
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </>
  )
}
