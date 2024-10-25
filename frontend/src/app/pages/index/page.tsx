import { Text } from '../../components/common/Text'
import { Input } from '../../components/forms/Input'
import { MagnifyingGlass } from 'phosphor-react'
import { Header } from '../../components/utils/Header'
import { useQuery } from '@tanstack/react-query'
import { Folder, FolderData } from '../../components/general/Folder'
import { client, queryClient } from '../../../code/settings'
import { useRef } from 'react'

export function PublicShortcutsPage() {
  const { data } = useQuery<FolderData[]>({
    queryKey: ['public-folders'],
    queryFn: async () => {
      return client.get('/public-folders').then((res) => res.data)
    },
  })
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    const response = await client.get(
      `/public-folders?search=${inputRef.current?.value || ''}`,
    )
    queryClient.setQueryData(['public-folders'], response.data)
  }

  return (
    <div className="body-df">
      <Header />
      <main className="w-full max-w-[70rem] mx-auto px-8">
        <div className="flex items-center justify-between pt-5 pb-4 mt-6">
          <h1 className="flex items-center gap-x-1">
            <img src="/icons/world.svg" className="h-8" />
            <Text variant="title">PUBLIC SHORTCUTS</Text>
          </h1>
          <form className="w-full max-w-[22rem]" onSubmit={handleSearch}>
            <Input.Box
              ref={inputRef}
              type="text"
              placeholder="Search..."
              RightIcon={<MagnifyingGlass size={20} color="var(--Green-300)" />}
            />
          </form>
        </div>
        {inputRef.current && inputRef.current.value !== '' && (
          <Text weight="regular" color="Gray-700">
            Searching for "{inputRef.current.value}"
          </Text>
        )}
        <section className="folders grid grid-cols-2 mt-10 gap-x-4 gap-y-8 pb-12">
          {data?.map((folder) => <Folder key={folder.id} folder={folder} />)}
        </section>
      </main>
    </div>
  )
}
