import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { LoginPage } from './app/pages/login/page'
import { MoviesPage } from './app/pages/index/page'
import Auth from './app/components/utils/Auth'
import { MoviePage } from './app/pages/movies/[id]'

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MoviesPage />} />
        <Route path="/movies/:movieId" element={<MoviePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<Auth />}>
          {/* <Route path="/register/movie" element={<MyShortcutsPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
