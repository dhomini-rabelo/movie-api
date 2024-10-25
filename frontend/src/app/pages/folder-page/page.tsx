import { Plus } from 'phosphor-react'
import { Text } from '../../components/common/Text'
import { Button } from '../../components/forms/Button'
import { Header } from '../../components/utils/Header'
import { useModals } from '../../hooks/useModal'
import { useQuery } from '@tanstack/react-query'
import { FolderEntity, ShortcutEntity } from '../../../code/entities'
import { client } from '../../../code/settings'
import { useParams } from 'react-router-dom'
import {
  ShortcutModal,
  ShortcutModalProps,
} from '../../components/general/Folder/sub-components/ShortcutModal '
import { useLoginStore } from '../../../code/stores/auth'
import { useState } from 'react'
import { ShortcutText } from '../../components/general/ShortcutText'

export function FolderPage() {
  const { folderId } = useParams()
  const username = useLoginStore((state) => state.username)
  const { currentActiveModal, activateModal, disableModal } =
    useModals<'shortcut-modal'>()
  const folderQuery = useQuery<{
    folder: FolderEntity
    author: { username: string }
    shortcuts: ShortcutEntity[]
  }>({
    queryKey: ['shortcuts-from-folder'],
    queryFn: async () => {
      return client
        .get(`/folders/${folderId}/shortcuts`)
        .then((res) => res.data)
    },
  })
  const [shortcutData, setShortcutData] = useState<
    ShortcutModalProps['shortcutData']
  >({
    folder: Number(folderId || 0),
  })
  const [mode, setMode] = useState<ShortcutModalProps['mode']>('read')
  const isAuthor = folderQuery.data?.author.username === username

  function openShortcutModalToCreate() {
    setShortcutData({
      folder: Number(folderId),
    })
    setMode('create')
    activateModal('shortcut-modal')
  }

  function openShortcutModalToEditOrEdit(shortcut: ShortcutEntity) {
    setShortcutData(shortcut)
    if (isAuthor) {
      setMode('edit')
    } else {
      setMode('read')
    }
    activateModal('shortcut-modal')
  }

  return (
    <>
      {currentActiveModal === 'shortcut-modal' && (
        <ShortcutModal
          onClose={disableModal}
          shortcutData={shortcutData}
          mode={mode}
        />
      )}
      <div className="body-df">
        <Header />
        <main className="w-full max-w-[70rem] mx-auto px-8">
          <div className="mt-12 flex items-center justify-between">
            <div className="flex flex-col">
              <h1 className="flex items-center justify-center gap-x-2">
                <img src="/icons/folder.svg" className="h-7 w-7" />
                <Text variant="title">
                  {folderQuery.data?.folder.name || ''}
                </Text>
              </h1>
              <div>
                <Text size="sm" weight="regular" color="Gray-700">
                  @{folderQuery.data?.author.username || ''}
                </Text>
              </div>
            </div>
            {isAuthor && (
              <div>
                <Button type="submit" onClick={openShortcutModalToCreate}>
                  <span className="flex items-center">
                    <Plus
                      size={16}
                      weight="bold"
                      className="inline-block mr-1 relative -top-[0.5px]"
                    />
                    Add Shortcut
                  </span>
                </Button>
              </div>
            )}
          </div>
          <section className="folders grid grid-cols-2 mt-8 gap-x-4 gap-y-8 pb-12">
            {folderQuery.data?.shortcuts.map((shortcut) => (
              <ShortcutText
                shortcut={shortcut}
                onClick={() => openShortcutModalToEditOrEdit(shortcut)}
                key={shortcut.id}
              />
            ))}
          </section>
        </main>
      </div>
    </>
  )
}
