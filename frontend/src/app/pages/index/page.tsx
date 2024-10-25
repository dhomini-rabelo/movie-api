import { Text } from '../../components/common/Text'
import { Input } from '../../components/forms/Input'
import { MagnifyingGlass } from 'phosphor-react'
import { Header } from '../../components/utils/Header'
import { useQuery } from '@tanstack/react-query'
import { client, queryClient } from '../../../code/settings'
import { useRef } from 'react'
import { MovieEntity } from '../../../code/entities'
import { Movie } from '../../components/general/Movie'

export function MoviesPage() {
  const { data } = useQuery<MovieEntity[]>({
    queryKey: ['movies'],
    queryFn: async () => {
      return client.post('/movie-app/movie/list').then((res) => res.data)
    },
  })
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    const response = await client.post(`/movie-app/movie/list`, {
      name: inputRef.current?.value || '',
    })
    queryClient.setQueryData(['movies'], response.data)
  }

  return (
    <div className="body-df">
      <Header />
      <main className="w-full max-w-[70rem] mx-auto px-8">
        <div className="flex items-center justify-between pt-5 pb-4 mt-6">
          <h1 className="flex items-center gap-x-1">
            <img src="/icons/world.svg" className="h-8" />
            <Text variant="title">MOVIES</Text>
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
          {data?.map((movie) => <Movie key={movie.id} movie={movie} />)}
        </section>
      </main>
    </div>
  )
}
