import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { LoginPage } from './app/pages/login/page'
import { MoviesPage } from './app/pages/index/page'
import Auth from './app/components/utils/Auth'
import { MoviePage } from './app/pages/movies/[id]'
import { RegisterMoviePagePage } from './app/pages/register/movie/page'

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MoviesPage />} />
        <Route path="/movies/:movieId" element={<MoviePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<Auth />}>
          <Route path="/register/movie" element={<RegisterMoviePagePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
