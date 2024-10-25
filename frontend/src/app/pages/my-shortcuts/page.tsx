import { Plus } from 'phosphor-react'
import { Text } from '../../components/common/Text'
import { Button } from '../../components/forms/Button'
import { Folder, FolderData } from '../../components/general/Folder'
import { Header } from '../../components/utils/Header'
import { useLoginStore } from '../../../code/stores/auth'
import { useQuery } from '@tanstack/react-query'
import { client } from '../../../code/settings'
import { useModals } from '../../hooks/useModal'
import { FolderModal } from '../../components/general/Folder/sub-components/FolderModal'

export function MyShortcutsPage() {
  const username = useLoginStore((state) => state.username)
  const folders = useQuery<FolderData[]>({
    queryKey: ['my-folders'],
    queryFn: async () => {
      return client.get('/my-folders').then((res) => res.data)
    },
  })
  const { currentActiveModal, activateModal, disableModal } =
    useModals<'folder-modal'>()

  return (
    <>
      {currentActiveModal === 'folder-modal' && (
        <FolderModal onClose={disableModal} />
      )}
      <div className="body-df">
        <Header />
        <main className="w-full max-w-[70rem] mx-auto px-8">
          <div className="mt-12 flex items-center justify-between">
            <div className="flex flex-col">
              <h1>
                <Text variant="title">MY SHORTCUTS</Text>
              </h1>
              <div>
                <Text size="sm" weight="regular" color="Gray-700">
                  @{username}
                </Text>
              </div>
            </div>
            <div>
              <Button
                type="submit"
                onClick={() => activateModal('folder-modal')}
              >
                <span className="flex items-center">
                  <Plus
                    size={16}
                    weight="bold"
                    className="inline-block mr-1 relative -top-[0.5px]"
                  />
                  Add folder
                </span>
              </Button>
            </div>
          </div>
          <section className="folders grid grid-cols-2 mt-8 gap-x-4 gap-y-8 pb-12">
            {folders.data?.map((folder) => (
              <Folder key={folder.id} folder={folder} editable />
            ))}
          </section>
        </main>
      </div>
    </>
  )
}
