import { Text } from '../../components/common/Text'
import { Input } from '../../components/forms/Input'
import { MagnifyingGlass, Plus } from 'phosphor-react'
import { Header } from '../../components/utils/Header'
import { useQuery } from '@tanstack/react-query'
import { client, queryClient } from '../../../code/settings'
import { useRef } from 'react'
import { MovieEntity } from '../../../code/entities'
import { Movie } from '../../components/general/Movie'
import { useLoginStore } from '../../../code/stores/auth'
import { Link } from 'react-router-dom'
import { Button } from '../../components/forms/Button'

export function MoviesPage() {
  const { data } = useQuery<MovieEntity[]>({
    queryKey: ['movies'],
    queryFn: async () => {
      return client.post('/movie-app/movie/list').then((res) => res.data)
    },
  })
  const inputRef = useRef<HTMLInputElement>(null)
  const accessToken = useLoginStore((state) => state.accessToken)

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
        <div className="flex items-center justify-between pt-5 pb-4 mt-6 sm:flex-col gap-y-4">
          <h1 className="flex items-center gap-x-1">
            <img src="/icons/world.svg" className="h-8" />
            <Text variant="title">MOVIES</Text>
          </h1>
          <div className="flex gap-x-4 sm:flex-col gap-y-4">
            <form className="w-full max-w-[28rem]" onSubmit={handleSearch}>
              <Input.Box
                ref={inputRef}
                type="text"
                placeholder="Search..."
                RightIcon={
                  <MagnifyingGlass size={20} color="var(--Green-300)" />
                }
              />
            </form>
            {accessToken && (
              <Link to="/register/movie">
                <Button>
                  <span className="flex items-center">
                    <Plus
                      size={16}
                      weight="bold"
                      className="inline-block mr-1 relative -top-[0.5px]"
                    />
                    Add
                  </span>
                </Button>
              </Link>
            )}
          </div>
        </div>
        {inputRef.current && inputRef.current.value !== '' && (
          <Text weight="regular" color="Gray-700">
            Searching for "{inputRef.current.value}"
          </Text>
        )}
        <section className="folders grid grid-cols-2 sm:grid-cols-1 mt-10 gap-x-4 gap-y-8 pb-12">
          {data?.map((movie) => <Movie key={movie.id} movie={movie} />)}
        </section>
      </main>
    </div>
  )
}
